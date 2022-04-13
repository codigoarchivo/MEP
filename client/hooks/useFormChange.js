import { useEffect, useState } from "react";

const useFormChange = (initialStates = {}, data) => {
  const [values, setValues] = useState(initialStates);

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

  return {
    values,
    reset,
    handleInputChange,
  };
};

export default useFormChange;
