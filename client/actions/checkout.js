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

export const checkoutAddEdit = (data) => {
  return async (dispatch) => {
    try {
      const dataList = {
        uid: data.uid,
        com: data.com,
        nam: data.nam,
        pho: data.pho,
        cre: data.cre,
        rat: data.rat,
      };

      if (data.id === "") {
        await setDoc(
          doc(collection(db, "serchs", data.idC, "messages")),
          dataList
        );
      } else {
        await setDoc(
          doc(collection(db, "serchs", data.idC, "messages", data.id)),
          dataList
        );
      }

      if (Number(data.li) === 1) {
        await dispatch(closeRevert());
      } else {
        await dispatch(deletecheckout({ id: data.idC }));
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

// editProduct message
export const valueInProduct = (data) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "serchs", data.id), data);
      await dispatch(productEdit(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productEdit = (data) => ({
  type: types.productEdit,
  payload: data,
});

const addcheckout = (data) => ({
  type: types.checkoutAdd,
  payload: data,
});
