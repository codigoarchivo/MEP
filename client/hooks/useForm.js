import { useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";

import Validator from "../helpers/Validator";

import { FileFirebase } from "../helpers/FileFirebase";

const useForm = (initialStates = {}, data) => {
  // toast
  const toast = useToast();

  const [values, setValues] = useState(initialStates);

  const [urlImage, setUrlImage] = useState("");

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (data) {
      setValues({ ...values, ...data });
    }
  }, [setValues]);

  const reset = (newFormState = initialStates) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const handleInputChange2 = (e) => {
    setValues({ ...values, cn: e });
  };

  const handleInputChange3 = ({ target }) => {
    const { mImage, esImg } = Validator({ imgsize: target.files[0]?.size });

    if (mImage)
      return toast({
        description: esImg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

    const file = target.files[0];

    if (file) {
      FileFirebase(file, setUrlImage, setProgress);
    }
  };

  const handleInputChange4 = ({ target }) => {
    const ct = {
      id: target.value,
      na: target.options[target.selectedIndex].text,
    };
    setValues({ ...values, ct });
  };

  return [
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    handleInputChange4,
    reset,
  ];
};

export default useForm;
