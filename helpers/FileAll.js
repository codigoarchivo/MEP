import React, { useRef, useState } from "react";

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "../firebase/config";

import { Button, InputGroup, Input } from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

import Validator from "./Validator";

import Toast from "./Toast";

import ModeColor from "./ModeColor";

const FileAll = ({ setUrlImage, carpeta }) => {
  const [progress, setProgress] = useState(0);
  // mode Color
  const { bg } = ModeColor();
  // file
  const file = useRef();

  function handleInputChange({ target }) {
    const file = target.files[0];

    const { mImage, esImg } = Validator({ imgsize: file.size });

    if (mImage) return Toast(esImg, "error", 5000);

    try {
      const uploadTask = uploadBytesResumable(
        storageRef(storage, `${carpeta}/${file.name}`),
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
      document.getElementById("imp").value = "";
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <InputGroup>
      <Input
        onChange={handleInputChange}
        name="imp"
        type={"file"}
        id="imp"
        ref={file}
        display="none"
      />
      <Button
        w={"80%"}
        rightIcon={<DownloadIcon w={6} h={6} />}
        variant={"outline"}
        textTransform={"uppercase"}
        onClick={() => file.current.click()}
        size="md"
        fontWeight={"normal"}
        _hover={{ border: bg }}
        p={1}
      >
        Subir: {progress}%
      </Button>
    </InputGroup>
  );
};

export default FileAll;
