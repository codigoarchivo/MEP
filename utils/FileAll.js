import React, { useRef, useState } from "react";

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "../firebase/config";

import { Button, InputGroup, Input } from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

import Validator from "../helpers/Validator";

import Toast from "../helpers/Toast";

import ModeColor from "../helpers/ModeColor";

const FileAll = ({ setUrlImage, fileName, save }) => {
  const [progress, setProgress] = useState(0);
  // mode Color
  const { bg } = ModeColor();
  // file
  const file = useRef();

  const imp = document.getElementById("imp");

  function handleUpload({ target }) {
    const file = target.files[0];

    const { mImage, esImg } = Validator({ imgsize: file.size });

    if (mImage) return Toast(esImg, "error", 5000);

    try {
      const uploadTask = uploadBytesResumable(
        storageRef(storage, `${fileName}/${file.name}`),
        file
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrlImage(downloadURL);
          });
        }
      );
      imp.value = "";
    } catch (error) {
      imp.value = "";
      console.log(error);
    }
  }
  return (
    <InputGroup>
      <Input
        onChange={handleUpload}
        name="imp"
        type={"file"}
        id="imp"
        ref={file}
        display="none"
      />
      <Button
        w={"full"}
        rightIcon={<DownloadIcon w={6} h={6} />}
        variant={"outline"}
        textTransform={"uppercase"}
        onClick={() => file.current.click()}
        size="md"
        fontWeight={"normal"}
        _hover={{ border: bg }}
        p={1}
      >
        {save}: {progress}%
      </Button>
    </InputGroup>
  );
};

export default FileAll;
