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

import Toast from "../helpers/Toast";

import { closeRevert } from "./checkout";

export const login = (uid, displayName, photoURL, email, rol) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    photoURL,
    email,
    rol,
  },
});

export const startLoginEmailPassword = (email, password, err) => {
  return async (dispatch) => {
    try {
      // start
      dispatch(startLoading());
      // login
      await signInWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          await dispatch(login(user.uid, user.displayName));
          await dispatch(finishLoading());
        })
        .catch(({ message }) => {
          // end
          dispatch(finishLoading());
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

export const startRegisterWithNameEmailPassword = (
  email,
  password,
  name,
  err
) => {
  return (dispatch) => {
    try {
      // start
      dispatch(startLoading());
      // create
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          await updateProfile(auth.currentUser, { displayName: name });
          await dispatch(login(user.uid, user.displayName));
          // rol
          await setDoc(doc(db, "users", user.uid.toString()), {
            co: user.email,
            na: user.displayName,
            rol: "user",
          });
          // end
          await dispatch(finishLoading());
        })
        .catch(({ message }) => {
          // end
          dispatch(finishLoading());
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

export const startGoogleLogin = (err) => {
  // google
  return async (dispatch) => {
    try {
      await signInWithPopup(auth, provider)
        .then(async ({ user }) => {
          await dispatch(login(user.uid, user.displayName));
        })
        .catch(({ message }) => {
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

export const sendEmail = (email, err) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/auth/reset?mode=action&oobCode=code",
    handleCodeInApp: true,
  };
  return async (dispatch) => {
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings)
        .then(() => {
          dispatch(emailSend(email));
        })
        .catch(({ message }) => {
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

const emailSend = (data) => ({
  type: types.active,
  payload: data,
});

export const resetPassword = (newPassword, actionCode, err) => {
  return async (dispatch) => {
    try {
      await confirmPasswordReset(auth, actionCode, newPassword)
        .then(() => {
          dispatch(passwordReset());
        })
        .catch(({ message }) => {
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

const passwordReset = () => ({
  type: types.closeActive,
});

export const logout = (err) => {
  return async (dispatch) => {
    try {
      await signOut(auth)
        .then(() => {
          dispatch(logoutAll());
        })
        .catch(({ message }) => {
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

const logoutAll = () => ({
  type: types.logout,
});

export const changeNameImgTel = (
  uid,
  photoURL,
  displayName,
  email,
  rol,
  err
) => {
  return async (dispatch) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      })
        .then(() => {
          dispatch(login(uid, displayName, photoURL, email, rol));
        })
        .catch(({ message }) => {
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};
