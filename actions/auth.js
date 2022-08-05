import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth, provider } from "../firebase/config";

import { types } from "../type";

import { finishLoading, startLoading } from "./ui";

import { Toast } from "../helpers/Toast";

const dA = process.env.NEXT_PUBLIC_ROL_A;

export const login = (
  uid,
  displayName,
  photoURL,
  email,
  rol,
  emailVerified
) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    photoURL,
    email,
    rol,
    emailVerified,
  },
});

export const startLoginEmailPassword = (email, password, err) => {
  return async (dispatch) => {
    try {
      // start
      await dispatch(startLoading());
      // login
      await signInWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          if (user) {
            dispatch(
              login(
                user.uid,
                user.displayName,
                user.photoURL,
                user.email,
                user.uid === dA.toString() ? "owner" : "user",
                user.emailVerified
              )
            );
          }

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
  err,
  data
) => {
  return (dispatch) => {
    try {
      // start
      dispatch(startLoading());
      // create
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          await updateProfile(auth.currentUser, { displayName: name });

          if (user) {
            dispatch(
              login(
                user.uid,
                user.displayName,
                user.photoURL,
                user.email,
                user.uid === dA.toString() ? "owner" : "user",
                user.emailVerified
              )
            );

            sendEmailVerification(auth.currentUser).then(() => {
              Toast(data, "success", 5000);
            });
          }
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
        .then(({ user }) => {
          if (user) {
            dispatch(
              login(
                user.uid,
                user.displayName,
                user.photoURL,
                user.email,
                user.uid === dA.toString() ? "owner" : "user",
                user.emailVerified
              )
            );
          }
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

export const sendEmail = (email, data1, data2, err) => {
  return async () => {
    try {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          Toast(`${data1} ${email} ${data2}`, "success", 5000);
        })
        .catch(({ message, code }) => {
          // error
          Toast(message, "error", 5000);
          Toast(code, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

export const resetPassword = (newPassword, oobCode, err, success) => {
  return async () => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => {
          Toast(success, "success", 5000);
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

export const handleVerifyEmail = (actionCode, err, message) => {
  return async () => {
    try {
      await applyActionCode(auth, actionCode)
        .then((resp) => {
          Toast(message, "success", 5000);
        })
        .catch((error) => {
          // error
          Toast(error, "error", 5000);
        });
    } catch (error) {
      // error
      Toast(err, "error", 5000);
    }
  };
};

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
