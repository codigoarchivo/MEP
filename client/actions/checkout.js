import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import Toast from "../helpers/Toast";

import { types } from "../type";

const dA = process.env.NEXT_PUBLIC_ROL_A;

export const checkoutList = (data) => {
  return async (dispatch) => {
    dispatch(listcheckout(data));
  };
};

const listcheckout = (data) => ({
  type: types.checkoutList,
  payload: data,
});

export const checkoutAdd = (data) => {
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

      await setDoc(
        doc(collection(db, "serchs", data.idC, "messages")),
        dataList
      );

      if (data.li === "1") {
        await dispatch(closeRevert());
      } else {
        await dispatch(deletecheckout(data.idC));
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

// checkoutEdit comentario
export const checkoutEdit = (data) => {
  return async () => {
    try {
      const dataList = {
        com: data.com,
        cre: data.cre,
        rat: data.rat,
      };

      await updateDoc(
        doc(db, "serchs", data.idC, "messages", data.id),
        dataList
      );
    } catch (error) {
      console.log(error);
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

// editProduct message
export const valueInProduct = (data) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "serchs", data.id), data);
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

export const validShop = (data) => {
  return async () => {
    try {
      // principal
      await addDoc(collection(db, "users", dA, "orders"), data);
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const validSales = (info) => {
  return async () => {
    try {
      // principal
      await addDoc(collection(db, "users", dA, "orders"), info);
      // sales
      await updateDoc(doc(db, "users", info.uidSale, "sales", info.idSale), {
        info,
      });
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};
