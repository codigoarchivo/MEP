import { collection, doc, setDoc } from "firebase/firestore";

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
        await setDoc(doc(collection(db, "serchs", data.id, "messages")), {
          uid: data.uid,
          com: data.com,
          nam: data.nam,
          pho: data.pho,
          cre: data.cre,
          rat: data.rat,
        });

        if (Number(data.li) === 1) {
          await dispatch(closeRevert());
        } else {
          await dispatch(deletecheckout(data.id));
        }
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};
export const closeRevert = () => ({
  type: types.productRevert,
});

const deletecheckout = (id) => ({
  type: types.checkoutDelete,
  payload: id,
});

const addcheckout = (data) => ({
  type: types.checkoutAdd,
  payload: data,
});
