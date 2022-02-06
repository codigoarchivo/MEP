import React from "react";

const useForm = (initialStates = {}) => {
  const [values, setValues] = React.useState(initialStates);

  const reset = () => {
    setValues(initialStates);
  };
  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return { values, handleInputChange, reset };
};

export default useForm;
