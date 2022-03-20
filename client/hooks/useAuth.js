import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import { login } from "../actions/auth";

const useAuth = () => {
  // dispatch
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isloggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsloggedIn(true);

        const dA = process.env.NEXT_PUBLIC_ROL_A;
        const r = user.uid === dA.toString();

        dispatch(
          login(user.uid, user.displayName, user.email, r ? "owner" : "user")
        );
        
      } else {
        setIsloggedIn(false);
      }
      setChecking(false);
    });
    return () => {
      setChecking(true);
    };
  }, [dispatch, setIsloggedIn, setChecking]);

  return {
    checking,
    isloggedIn,
  };
};

export default useAuth;
