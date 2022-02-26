import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { types } from "../type";

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startGoogleLogin = () => {
  return async (dispatch) => {
    await signInWithPopup(auth, provider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};
