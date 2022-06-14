import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

const AuthStageChanfe = () => {
  const [identifier, setIdentifier] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const dA = process.env.NEXT_PUBLIC_ROL_A;
        setIdentifier({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          rol: user.uid === dA.toString() ? "owner" : "user",
        });
      }
    });
  }, [setIdentifier]);

  return {
    identifier,
  };
};

export default AuthStageChanfe;
