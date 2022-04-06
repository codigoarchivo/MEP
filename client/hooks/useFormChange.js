import { useEffect, useState } from "react";

const useFormChange = (initialStates = {}, data) => {
  const [values, setValues] = useState(initialStates);

  useEffect(() => {
    if (data) {
      setValues({ ...values, ...data });
    }
  }, [setValues]);

  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return {
    values,
    handleInputChange,
  };
};

export default useFormChange;
