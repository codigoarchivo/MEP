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
  return async () => {
    await sendPasswordResetEmail(auth, email, {
      url: `https://localhost:3000`,
    })
      .then(function (e) {
        console.log(e);
        // Password reset email sent.
      })
      .catch(({ message }) => {
        console.log(message);
        // Error occurred. Inspect error.code.
      });
  };
};

export const resetPassword = (email, newPassword) => {
  return async (dispatch) => {
    await confirmPasswordReset(auth, email, newPassword)
      .then((e) => {
        console.log(e);
        // Password reset email sent.
      })
      .catch(({ message }) => {
        console.log(message);
        // Error occurred. Inspect error.code.
      });
  };
};

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
