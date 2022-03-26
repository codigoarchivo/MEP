import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import Validator from "../helpers/Validator";

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
    const { mImage } = Validator({ imgsize: target.files[0].size });
    
    if (mImage)
      return Swal.fire("Error", "Imagen no tiene que ser mayor a 5mb", "error");

    const file = target.files[0];
    FileFirebase(file, setUrlImage, setProgress);
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
