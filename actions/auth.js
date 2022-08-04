import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
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
                user.uid === dA.toString() ? "owner" : "user"
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

          if (user) {
            dispatch(
              login(
                user.uid,
                user.displayName,
                user.photoURL,
                user.email,
                user.uid === dA.toString() ? "owner" : "user"
              )
            );
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
                user.uid === dA.toString() ? "owner" : "user"
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

export const sendEmail = (email, err) => {
  // const actionCodeSettings = {
  //   url: "https://mep-six.vercel.app/__/auth/action?mode=action&oobCode=code",
  //   handleCodeInApp: true,
  // };
  // noreply@epmp-199ff.firebaseapp.com
  return async () => {
    try {
      await sendPasswordResetEmail(auth, email)
        .then(() => {})
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

export const resetPassword = (newPassword, err) => {
  return async (dispatch) => {
    try {
      await confirmPasswordReset(auth, newPassword)
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
