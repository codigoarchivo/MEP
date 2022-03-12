import Swal from "sweetalert2";

import { auth, provider } from "../firebase/config";

import { types } from "../type";

import { finishLoading, startLoading } from "./ui";

import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const userRol = (uid, email) => ({
  type: types.userRol,
  payload: {
    uid,
    email,
  },
});

export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    // start
    dispatch(startLoading());
    // login
    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // console.log(user.email);
        dispatch(login(user.uid, user.displayName));
        // end
        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        // end
        dispatch(finishLoading());
        // error
        Swal.fire("Error", message, "error");
      });
  };
};

export const startRegisterWithNameEmailPassword = (email, password, name) => {
  return (dispatch) => {
    // start
    dispatch(startLoading());
    // create
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, { displayName: name });
        dispatch(login(user.uid, user.displayName));
        // end
        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        // end
        dispatch(finishLoading());
        // error
        Swal.fire("Error", message, "error");
      });
  };
};

export const startGoogleLogin = () => {
  // google
  return async (dispatch) => {
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch(({ message }) => {
        // error
        Swal.fire("Error", message, "error");
      });
  };
};

export const sendEmail = (email) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/account/reset?mode=action&oobCode=code",
    handleCodeInApp: true,
  };
  return async (dispatch) => {
    await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        dispatch(emailSend(email));
      })
      .catch(({ message }) => {
        // error
        Swal.fire("Error", message, "error");
      });
  };
};
const emailSend = (data) => ({
  type: types.active,
  payload: data,
});

export const resetPassword = (newPassword, actionCode) => {
  return async (dispatch) => {
    await confirmPasswordReset(auth, actionCode, newPassword)
      .then(() => {
        dispatch(passwordReset());
      })
      .catch(({ message }) => {
        // error
        Swal.fire("Error", message, "error");
      });
  };
};

const passwordReset = () => ({
  type: types.closeActive,
});

export const logout = () => {
  return async (dispatch) => {
    await signOut(auth)
      .then(() => {
        dispatch(logoutClose());
      })
      .catch(({ message }) => {
        // error
        Swal.fire("Error", message, "error");
      });
  };
};

const logoutClose = () => ({
  type: types.logout,
});
