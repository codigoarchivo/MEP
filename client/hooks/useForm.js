import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import { startUploading } from "../actions/product";

import Validator from "../helpers/Validator";

const useForm = (initialStates = {}, dataId) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { activeSelect } = useSelector(({ product }) => product);
  // values
  const [values, setValues] = useState(initialStates);

  useEffect(() => {
    if (dataId.data === null) {
      setValues({ ...values, initialStates, word: dataId.word });
    } else {
      setValues({
        ...values,
        ...dataId.data,
        word: dataId.word,
        image: activeSelect?.image ? activeSelect?.image : dataId.data.image,
      });
    }
  }, [setValues]);

  const reset = () => {
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
