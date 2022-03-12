import { useState } from "react";

import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { startUploading } from "../actions/product";

import Validator from "../helpers/Validator";

const useForm = (initialStates = {}) => {
  // console.log(initialStates);
  // dispatch
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialStates);

  const reset = (newFormState = initialStates) => {
    setValues(initialStates);
  };

  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const handleInputChange2 = (e) => {
    setValues({ ...values, cantidad: e });
  };

  const handleInputChange3 = ({ target }) => {
    const { mImage } = Validator({ imgsize: target.files[0].size });

    if (mImage)
      return Swal.fire(
        "Error",
        "Imagen tiene que tener menos de 500kb",
        "error"
      );

    const file = target.files[0];

    dispatch(startUploading(file));
  };

  return {
    values,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    reset,
  };
};

export default useForm;
