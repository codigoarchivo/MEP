import { useState } from "react";

import { useSelector } from "react-redux";

import Validator from "../helpers/Validator";

const useForm = (initialStates = {}) => {
  // selector
  const { activeimg } = useSelector(({ serch }) => serch);

  const [values, setValues] = useState(initialStates);

  const [imgenM, setImgenM] = useState(false);

  const reset = () => {
    setValues(initialStates);
  };

  const handleInputChange = ({ target }) => {
    !activeimg && setValues({ ...values, image: activeimg });
    setValues({ ...values, [target.name]: target.value });
  };

  const handleInputChange2 = (e) => {
    setValues({ ...values, cantidad: e });
  };

  const handleInputChange3 = ({ target }) => {
    const { mImage } = Validator({ imgsize: target.files[0].size });
    if (mImage) setImgenM(mImage);

    const file = target.files[0];
  };

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
