import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase/config";

import { login } from "../actions/auth";

import { collection, getDocs, query, where } from "firebase/firestore";

const useAuth = () => {
  // dispatch
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isloggedIn, setIsloggedIn] = useState(false);

  async function getRol(uid) {
    const q = query(collection(db, "users"), where("id", "==", uid));
    const el = await getDocs(q);
    const data = el?.docs[0]?.data().rol;
    return data;
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getRol(user.uid).then((rol) => {
          dispatch(login(user.uid, user.displayName, user.email, rol));
          setIsloggedIn(true);
        });
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
