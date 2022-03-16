import Swal from "sweetalert2";

import { auth, db, provider } from "../firebase/config";

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

import { doc, setDoc } from "firebase/firestore";

export const login = (uid, displayName, email, rol) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    email,
    rol,
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
        // rol
        setDoc(doc(db, "users", `${String(user.uid)}`), {
          correo: user.email,
          rol: "user",
        });
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
