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

export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
  };
};

export const startRegisterWithNameEmailPassword = (email, password, name) => {
  return (dispatch) => {
    try {
      // start
      dispatch(startLoading());
      // create
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          await updateProfile(auth.currentUser, { displayName: name });
          dispatch(login(user.uid, user.displayName));
          // rol
          setDoc(doc(db, "users", user.uid.toString()), {
            uid: user.uid,
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
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
  };
};

export const startGoogleLogin = () => {
  // google
  return async (dispatch) => {
    try {
      await signInWithPopup(auth, provider)
        .then(({ user }) => {
          dispatch(login(user.uid, user.displayName));
        })
        .catch(({ message }) => {
          // error
          Swal.fire("Error", message, "error");
        });
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
  };
};

export const sendEmail = (email) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/account/reset?mode=action&oobCode=code",
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
          Swal.fire("Error", message, "error");
        });
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
  };
};
const emailSend = (data) => ({
  type: types.active,
  payload: data,
});

export const resetPassword = (newPassword, actionCode) => {
  return async (dispatch) => {
    try {
      await confirmPasswordReset(auth, actionCode, newPassword)
        .then(() => {
          dispatch(passwordReset());
        })
        .catch(({ message }) => {
          // error
          Swal.fire("Error", message, "error");
        });
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
  };
};

const passwordReset = () => ({
  type: types.closeActive,
});

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOut(auth)
        .then(() => {
          dispatch(logoutClose());
        })
        .catch(({ message }) => {
          // error
          Swal.fire("Error", message, "error");
        });
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
  };
};

const logoutClose = () => ({
  type: types.logout,
});

export const changeNameImgTel = (uid, photoURL, displayName, email, rol) => {
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
          Swal.fire("Error", message, "error");
        });
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
  };
};
