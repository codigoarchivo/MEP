import { useEffect, useState } from "react";

import Validator from "../helpers/Validator";
import Toast from "../helpers/Toast";

import { FileFirebase } from "../helpers/FileFirebase";

const useForm = (initialStates = {}, data) => {
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

    if (mImage) return Toast(esImg, "error", 5000);

    const file = target.files[0];

    if (file) {
      FileFirebase(file, setUrlImage, setProgress);
    }
  };

  return {
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    reset,
  };
};

export default useForm;
