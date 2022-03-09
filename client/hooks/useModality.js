import { useState } from "react";

export const useModality = (val = false) => {
  const [modality, setModality] = useState(val);
  return {
    modality,
    setModality,
  };
};
export const useModality2 = (val = false) => {
  const [modality2, setModality2] = useState(val);
  
  return {
    modality2,
    setModality2,
  };
};
