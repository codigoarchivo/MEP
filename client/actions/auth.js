import Swal from "sweetalert2";

import { auth, provider } from "../firebase/config";

import { types } from "../type";

import { finishLoading, startLoading } from "./ui";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});


export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    // start
    dispatch(startLoading());
    // login
    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        // end
        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        // end
        dispatch(finishLoading());
        Swal.fire("Error", message, "error");
      });
  };
};

export const startRegisterWithNameEmailPassword = (email, password, name) => {
  return (dispatch) => {
    // create
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startGoogleLogin = () => {
  // google
  return async (dispatch) => {
    await signInWithPopup(auth, provider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};
