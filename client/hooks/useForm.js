import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { startUploading } from "../actions/product";

import Validator from "../helpers/Validator";

const useForm = (initialStates = {}) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { activeImg } = useSelector(({ product }) => product);

  const [values, setValues] = useState(initialStates);

  const [imgenM, setImgenM] = useState(false);

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

    if (mImage) {
      return setImgenM(mImage);
    }

    const file = target.files[0];

    dispatch(startUploading(file));
  };

  useEffect(() => {
    if (activeImg) {
      setValues({ ...values, image: activeImg });
    }
  }, [activeImg, setValues]);

  return {
    values,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    reset,
    imgenM,
    setImgenM,
  };
};

export default useForm;
