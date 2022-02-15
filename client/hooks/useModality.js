import { useState } from "react";

export const useModality = (val = false) => {
  const [modality, setModality] = useState(val);
  return {
    modality,
    setModality,
  };
};
