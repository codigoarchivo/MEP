import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";

import Toast from "../helpers/Toast";

import { types } from "../type";

const dA = process.env.NEXT_PUBLIC_ROL_A;

export const validPago = (referencia = {}, idThree = "", uidSale = "") => {
  return async () => {
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

export const cheListAll = (data) => ({
  type: types.cheListAllHistory,
  payload: data,
});

export const checkoutAdd = (data, rat, g, p) => {
  return async (dispatch, getState) => {
    const { activeCartSelect: check = [] } = await getState().checkout;
    try {
      // p es el id del producto
      await setDoc(doc(collection(db, "serchs", p, "messages")), data);

      // g es el id del buys
      await updateDoc(doc(db, "buys", g), {
        close: true,
      });
      // rat es el rating se agrega al producto
      await updateDoc(doc(db, "serchs", p), rat);

      if (check.length === 1) {
        await dispatch(closeRevert());
      } else {
        await dispatch(deletecheckout(g));
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

export const checkRevert = () => ({
  type: types.cheClear,
});

// checkoutEdit comentario
export const checkoutEdit = (data, rat, g, p) => {
  return async () => {
    try {
      await updateDoc(doc(db, "serchs", p, "messages", g), data);

      await updateDoc(doc(db, "serchs", p), rat);
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const checkoutList = (data) => {
  return async (dispatch) => {
    dispatch(listcheckout(data));
  };
};

const listcheckout = (data) => ({
  type: types.checkoutList,
  payload: data,
});
