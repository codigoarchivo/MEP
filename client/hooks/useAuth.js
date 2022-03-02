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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user.uid, user.displayName));
        setIsloggedIn(true);
      } else {
        setIsloggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsloggedIn]);

  return {
    checking,
    isloggedIn,
  };
};

export default useAuth;
