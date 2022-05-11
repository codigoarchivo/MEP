import { useEffect, useMemo, useState } from "react";

import { useDispatch } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import { login } from "../actions/auth";

const AuthChange = () => {
  // dispatch
  const dispatch = useDispatch();
  // checking
  const [checking, setChecking] = useState(true);
  // isloggedIn
  const [isloggedIn, setIsloggedIn] = useState(false);

  useMemo(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const dA = process.env.NEXT_PUBLIC_ROL_A;
        dispatch(
          login(
            user.uid,
            user.displayName,
            user.photoURL,
            user.email,
            user.uid === dA.toString() ? "owner" : "user",
          )
        );

        setIsloggedIn(true);
      } else {
        setIsloggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setIsloggedIn, setChecking]);

  return null;
};

export default AuthChange;
