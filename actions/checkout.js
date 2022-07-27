import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";

import { Toast } from "../helpers/Toast";

import { types } from "../type";

const dA = process.env.NEXT_PUBLIC_ROL_A;

export const validPago = (
  referencia = {},
  idThree = "",
  sal = "",
  err,
  buy,
  own
) => {
  return async (dispatch) => {
    try {
      if (dA.toString() === sal.toString()) {
        // principal
        await updateDoc(doc(db, "sales", idThree), {
          process: true,
        });

        // buy
        await updateDoc(doc(db, "users", buy, "buys", idThree), {
          process: true,
          sal: sal.toString(), // solo para la informacion para cliente
        });
      }

      if (dA.toString() !== sal.toString()) {
        delete referencia.own; // elimina uid owner
        delete referencia.id; // elimina id

        // sales
        await addDoc(collection(db, "users", sal, "sales"), {
          ...referencia,
          process: true,
          cre: Date.now(),
        });

        // buy
        await updateDoc(doc(db, "users", buy, "buys", idThree), {
          process: true,
          sal: sal.toString(), // solo para la informacion para cliente
        });

        // principal
        await updateDoc(doc(db, "sales", idThree), {
          process: true,
        });
      }
      await dispatch(
        cheListHistoryEdit({ ...referencia, process: true, own, id: idThree })
      );
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

export const checkoutAdd = (data, rat, g, p, err, uid) => {
  return async (dispatch, getState) => {
    const { activeSelectCheck: check = [] } = await getState().process;
    try {
      // p es el id del producto
      await addDoc(collection(db, "serchs", p, "messages"), data);

      // g es el id del buys
      await updateDoc(doc(db, "users", uid, "buys", g), {
        close: true,
      });
      // rat es el rating se agrega al producto
      await updateDoc(doc(db, "serchs", p), rat);

      if (check.length <= 1) {
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
export const checkoutEdit = (data, rat, g, p, err, dataF) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "serchs", p, "messages", g), data);

      await updateDoc(doc(db, "serchs", p), rat);

      const newdata = {
        ...data,
        ...dataF,
      };

      dispatch(messageEdit(newdata));
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const messageEdit = (data) => ({
  type: types.cheListMessageEdit,
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
