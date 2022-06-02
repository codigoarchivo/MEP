import { useEffect, useState } from "react";

const useFormAll = (initialStates = {}, data = {}) => {
  const [values, setValues] = useState(initialStates);

  useEffect(() => {
    if (data) {
      setValues({ ...values, ...data });
    } else {
      setValues({ ...values });
    }
  }, [setValues]);

  // reset
  const reset = (newFormState = initialStates) => {
    setValues(newFormState);
  };
  // handleInputChange
  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };
  // handlePassword
  const handlePassword = () => setValues({ ...values, pass: !values.pass });
  // handleRePassword
  const handleRePassword = () => setValues({ ...values, rPass: !values.rPass });
  // handleNumberInput
  const handleNumberInput = (e) => {
    setValues({ ...values, cn: e });
  };

  return {
    values,
    handleInputChange,
    handlePassword,
    handleRePassword,
    handleNumberInput,
    reset,
  };
};

export default useFormAll;
