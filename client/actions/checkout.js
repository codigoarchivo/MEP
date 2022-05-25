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
  console.log(data);
  return async (dispatch) => {
    try {
      const dataList = {
        uid: data.uidC,
        com: data.com,
        nam: data.nam,
        pho: data.pho,
        cre: data.cre,
        rat: data.rat,
      };

      await setDoc(
        doc(collection(db, "serchs", data.idPV, "messages")),
        dataList
      );

      // sales
      await updateDoc(doc(db, "users", data.uidV, "sales", data.idGlobal), {
        close: data.close,
      });

      // buy
      await updateDoc(doc(db, "users", data.uidC, "buys", data.idGlobal), {
        close: data.close,
      });

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

export const validShop = (info) => {
  return async () => {
    try {
      // principal
      await updateDoc(doc(db, "users", dA, "sales", info.idThree), { info });
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const validPago = (info) => {
  return async () => {
    try {
      // sales
      await updateDoc(doc(db, "users", info.uid, "sales", info.idThree), {
        process: info.process,
        buy: info.buy,
      });
      // buy
      await updateDoc(doc(db, "users", info.id, "buys", info.idThree), {
        process: info.process,
        sale: info.sale,
      });
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};
