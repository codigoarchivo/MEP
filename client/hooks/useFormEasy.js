import { useState } from "react";

import { FileFirebaseReceipt } from "../helpers/FileFirebaseReceipt";

import Toast from "../helpers/Toast";

import Validator from "../helpers/Validator";

const useFormEasy = (initialStates = {}) => {
  const [values, setValues] = useState(initialStates);

  const [urlImage, setUrlImage] = useState("");

  const [progress, setProgress] = useState(0);

  const reset = (newFormState = initialStates) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const handleInputChange2 = ({ target }) => {
    const { mImage, esImg } = Validator({ imgsize: target.files[0].size });

    if (mImage) return Toast(esImg, "error", 5000);

    const file = target.files[0];
    
    if (file) {
      FileFirebaseReceipt(file, setUrlImage, setProgress);
    }
  };

  return {
    values,
    urlImage,
    progress,
    reset,
    handleInputChange,
    handleInputChange2,
  };
};

export default useFormEasy;
