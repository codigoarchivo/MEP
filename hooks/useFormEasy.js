import { useState } from "react";

const useFormEasy = (initialStates = {}) => {
  const [values, setValues] = useState(initialStates);

  const reset = (newFormState = initialStates) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return {
    values,
    reset,
    handleInputChange,
  };
};

export default useFormEasy;
