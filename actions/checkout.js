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
// TODO: creo qu lo voy a cambiar
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

export const validShop = (sale, idThree) => {
  return async () => {
    try {
      // principal
      await setDoc(doc(db, "sales", idThree), {
        ...sale,
      });
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const validPago = (referencia = {}, idThree = "", uidSale = "") => {
  return async (dispatch) => {
    try {
      if (dA.toString() === uidSale.toString()) {
        
        // principal
        await updateDoc(doc(db, "sales", idThree), {
          process: true,
        });

        // buy
        await updateDoc(doc(db, "buys", idThree), {
          process: true,
        });
      }

      if (dA.toString() !== uidSale.toString()) {
        // sales
        await setDoc(doc(db, "sales"), {
          ...referencia,
          uid: uidSale,
        });

        // principal
        await updateDoc(doc(db, "sales", idThree), {
          process: true,
        });

        // buy
        await updateDoc(doc(db, "buys", idThree), {
          process: true,
        });
      }
    } catch (error) {
      Toast("Al parecer hay un errorqsqsq", "error", 5000);
    }
  };
};

export const cheListAll = (data) => ({
  type: types.cheListAllHistory,
  payload: data,
});

// verify
export const cheVerify = (data) => ({
  type: types.cheActiveVerify,
  payload: data,
});

export const cheCloseVerify = () => ({
  type: types.cheClearVerify,
});
