import { useEffect, useState } from "react";

import Validator from "../helpers/Validator";

import { FileFirebasePerfil } from "../helpers/FileFirebasePerfil";
import Toast from "../helpers/Toast";

const useFormUser = (initialStates = {}, data) => {
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

  const handleInputChange2 = ({ target }) => {
    const { mImage, esImg } = Validator({ imgsize: target.files[0]?.size });

    if (mImage) return Toast(esImg, "error", 5000);

    const file = target.files[0];

    if (file) {
      FileFirebasePerfil(file, setUrlImage, setProgress);
    }
  };

  return [
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
    reset,
  ];
};

export default useFormUser;
