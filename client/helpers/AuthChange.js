import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import { login } from "../actions/auth";

const AuthChange = () => {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
  }, [dispatch]);

  return null;
};

export default AuthChange;
