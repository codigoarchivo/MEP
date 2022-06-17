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

export const checkRevert = () => ({
  type: types.cheClear,
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

export const cheListAll = (data) => ({
  type: types.cheListAllHistory,
  payload: data,
});

export const cheListAllActive = (data) => ({
  type: types.cheListAllActive,
  payload: data,
});

export const validShop = (sale, idThree) => {
  return async () => {
    try {
      // principal
      await setDoc(doc(db, "users", dA, "sales", idThree), {
        ...sale,
      });
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const validPago = (
  info = {},
  idThree = "",
  idProduct = "",
  uidBuy = ""
) => {
  return async (dispatch) => {
    try {
      if (dA.toString() === idProduct.toString()) {
        // buy
        await updateDoc(doc(db, "users", uidBuy, "buys", idThree), {
          sale: info.sale,
          process: true,
        });
        dispatch(checkRevert());
      }

      if (dA.toString() !== idProduct.toString()) {
        // sales
        await setDoc(doc(db, "users", idProduct, "sales", idThree), {
          buy: info.buy,
          product: info.product,
        });
        // buy
        await updateDoc(doc(db, "users", uidBuy, "buys", idThree), {
          sale: info.sale,
          process: true,
        });
        dispatch(checkRevert());
      }

    
    } catch (error) {
      Toast("Al parecer hay un errorqsqsq", "error", 5000);
    }
  };
};
