import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import { login } from "../actions/auth";

import { useDispatch } from "react-redux";

const AuthChange = () => {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const dA = process.env.NEXT_PUBLIC_ROL_A;
        dispatch(
          login(
            user.uid,
            user.displayName,
            user.photoURL,
            user.email,
            user.uid === dA.toString() ? "owner" : "user"
          )
        );
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return null;
};

export default AuthChange;
