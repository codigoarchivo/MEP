import { useMemo, useState } from "react";

const useTranslations = (data, r = "en") => {
  const [t, setT] = useState({});

  useMemo(() => {
    fetch(data)
      .then((res) => res.json())
      .then((t) => setT(t));
  }, [r]);

  return {
    t,
  };
};

export default useTranslations;
