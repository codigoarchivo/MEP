import { memo, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import { useDispatch } from "react-redux";

import { login } from "../actions/auth";

export const AuthStateChange = () => {
  const dispatch = useDispatch();

  const dA = process.env.NEXT_PUBLIC_ROL_A;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!!user?.uid) {
        dispatch(
          login(
            user.uid,
            user.displayName,
            user.photoURL,
            user.email,
            user.uid === dA.toString() ? "owner" : "user",
            user.emailVerified
          )
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};
