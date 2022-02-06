import React from "react";
const data = {
  password: false,
  rePassword: false,
};
const useFormShow = () => {
  const [show, setShow] = React.useState(data);
  const handleClick = () => setShow({ ...show, password: !show.password });
  const handleClick2 = () => setShow({ ...show, rePassword: !show.rePassword });

  return { show, handleClick, handleClick2 };
};

export default useFormShow;
