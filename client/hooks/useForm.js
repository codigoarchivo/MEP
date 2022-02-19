import React from "react";

const useForm = (initialStates = {}) => {
  const [values, setValues] = React.useState(initialStates);

  const reset = () => {
    setValues(initialStates);
  };

  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };
  const handleInputChange2 = (e) => {
    setValues({ ...values, cantidad: e });
  };

  return { values, handleInputChange, handleInputChange2, reset };
};

export default useForm;
