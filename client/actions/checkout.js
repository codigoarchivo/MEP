import { doc, setDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import Toast from "../helpers/Toast";

import { types } from "../type";

export const checkoutList = (data) => {
  return async (dispatch) => {
    dispatch(listcheckout(data));
  };
};
const listcheckout = (data) => ({
  type: types.checkoutList,
  payload: data,
});

export const checkoutadd = (data) => {
  return async (dispatch) => {
    try {
      if (data) {
        await data.map((item) => {
          setDoc(doc(db, item.id, "comment"), { rat: item.rat, com: item.com });
        });
        // TODO add product to checkout
        // await dispatch(addcheckout(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};
const addcheckout = (data) => ({
  type: types.checkoutAdd,
  payload: data,
});
