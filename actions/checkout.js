import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";

import { Toast } from "../helpers/Toast";

import { types } from "../type";

const dA = process.env.NEXT_PUBLIC_ROL_A;

export const validPago = (referencia = {}, idThree = "", sal = "", err) => {
  return async (dispatch) => {
    delete referencia.own; // elimina uid owner
    try {
      // referencia para el vendedor
      const val = {
        ...referencia,
        process: true,
        sal: sal.toString(), // para que el vendedor sepa cual venta realizo
        cre: Date.now(),
      };

      if (dA.toString() === sal.toString()) {
        // principal
        await updateDoc(doc(db, "sales", idThree), {
          process: true,
        });

        // buy
        await updateDoc(doc(db, "buys", idThree), {
          process: true,
          sal: sal.toString(), // solo para la informacion para cliente
        });
      }

      if (dA.toString() !== sal.toString()) {
        // sales
        await setDoc(doc(collection(db, "sales")), val);

        // buy
        await updateDoc(doc(db, "buys", idThree), {
          process: true,
          sal: sal.toString(), // solo para la informacion para cliente
        });

        // principal
        await updateDoc(doc(db, "sales", idThree), {
          process: true,
        });
      }

      dispatch(cheListHistoryEdit({ ...referencia, process: true }));
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const cheListHistoryEdit = (data) => ({
  type: types.cheListAllHistoryEdit,
  payload: data,
});

export const validShop = (sale, idThree, err) => {
  return async () => {
    try {
      // principal
      await setDoc(doc(db, "sales", idThree), {
        ...sale,
      });
    } catch (error) {
      Toast(err, 5000);
    }
  };
};

export const cheListAll = (data) => ({
  type: types.cheListAllHistory,
  payload: data,
});

export const cheListAllSale = (data) => ({
  type: types.cheListAllSa,
  payload: data,
});

export const cheListAllClear = () => ({
  type: types.cheListAllCle,
});

export const cheListAllBuy = (data) => ({
  type: types.cheListAllBu,
  payload: data,
});

export const cheListAllClearBu = () => ({
  type: types.cheListAllCleBu,
});

export const checkoutAdd = (data, rat, g, p, err) => {
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
      Toast(err, "error", 5000);
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
export const checkoutEdit = (data, rat, g, p, err) => {
  return async () => {
    try {
      await updateDoc(doc(db, "serchs", p, "messages", g), data);

      await updateDoc(doc(db, "serchs", p), rat);
    } catch (error) {
      Toast(err, "error", 5000);
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

export const messagesList = (data) => ({
  type: types.cheListMessage,
  payload: data,
});

export const messagesClear = (data) => ({
  type: types.cheListMessageClear,
  payload: data,
});
