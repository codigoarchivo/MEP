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
        data.map((item) =>
          setDoc(doc(collection(db, "serchs", item.id, "messages")), {
            rat: item.rat,
            com: item.com,
          })
        );
        await dispatch(closeRevert());
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};
export const closeRevert = () => ({
  type: types.productRevert,
});

const addcheckout = (data) => ({
  type: types.checkoutAdd,
  payload: data,
});
