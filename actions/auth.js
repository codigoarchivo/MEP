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
import UserTwo from "../helpers/UserTwo";
import { activeProduct } from "./product";

export const login = (
  uid = null,
  displayName = null,
  photoURL = null,
  email = null,
  rol = null
) => ({
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
        .then(async ({ user }) => {
          await dispatch(login(user.uid, user.displayName));
          await dispatch(finishLoading());

          if (user.uid) {
            const { dataUser } = await UserTwo(user.uid, "buys");
            if (dataUser.length > 0) {
              await dispatch(activeProduct(dataUser));
            }
          }
        })
        .catch(({ message }) => {
          // end
          dispatch(finishLoading());
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast("Al parecer hay un error", "error", 5000);
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
          await dispatch(login(user.uid, user.displayName));
          // rol
          await setDoc(doc(db, "users", user.uid.toString()), {
            co: user.email,
            na: user.displayName,
            rol: "user",
          });
          // end
          await dispatch(finishLoading());

          if (user.uid) {
            const { dataUser } = await UserTwo(user.uid, "buys");
            if (dataUser.length > 0) {
              await dispatch(activeProduct(dataUser));
            }
          }
        })
        .catch(({ message }) => {
          // end
          dispatch(finishLoading());
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const startGoogleLogin = () => {
  // google
  return async (dispatch) => {
    try {
      await signInWithPopup(auth, provider)
        .then(async ({ user }) => {
          await dispatch(login(user.uid, user.displayName));

          if (user.uid) {
            const { dataUser } = await UserTwo(user.uid, "buys");
            if (dataUser.length > 0) {
              await dispatch(activeProduct(dataUser));
            }
          }
        })
        .catch(({ message }) => {
          // error
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast("Al parecer hay un error", "error", 5000);
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
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast("Al parecer hay un error", "error", 5000);
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
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast("Al parecer hay un error", "error", 5000);
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
          Toast(message, "error", 5000);
        });

      await dispatch(closeRevert());
    } catch (error) {
      // error
      Toast("Al parecer hay un error", "error", 5000);
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
          Toast(message, "error", 5000);
        });
    } catch (error) {
      // error
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};
