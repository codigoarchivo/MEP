import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import { login } from "../actions/auth";

const useAuth = () => {
  // dispatch
  const dispatch = useDispatch();
  // checking
  const [checking, setChecking] = useState(true);
  // isloggedIn
  const [isloggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsloggedIn(true);
        const dA = process.env.NEXT_PUBLIC_ROL_A;
        dispatch(
          login(
            user.uid,
            user.displayName,
            user.photoURL,
            user.email,
            user.uid === dA.toString() ? "owner" : "user",
            checking,
            isloggedIn
          )
        );
      } else {
        setIsloggedIn(false);
      }
      setChecking(false);
    });
    return () => {
      setChecking(true);
      setIsloggedIn(false);
    };
  }, [dispatch, setIsloggedIn, setChecking]);

  return {
    checking,
    isloggedIn,
  };
};

export default useAuth;
