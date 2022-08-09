import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

import { db } from "../firebase/config";

import { dbProductEdit } from "../data/dbProducts";

import { Toast } from "../helpers/Toast";

import { types } from "../type";

export const listDataProduct = (data, err) => {
  return async (dispatch) => {
    try {
      if (!!data[0]) {
        await dispatch(productDataList(data));
      }
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const productDataList = (data) => ({
  type: types.product,
  payload: data,
});

export const serchProductList = (filtro, err) => {
  return async (dispatch) => {
    try {
      await dispatch(listProductSerch(filtro));
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const listProductSerch = (data) => ({
  type: types.serchList,
  payload: data,
});

// Product path: /
export const productListIndex = (data) => ({
  type: types.productList,
  payload: data,
});

export const addProduct = (resData = {}, err) => {
  return async (dispatch) => {
    try {
      const { id } = await addDoc(collection(db, "serchs"), {
        ...resData,
      });

      if (id) dispatch(productAdd({ ...resData, id }));

    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const productAdd = (data) => ({
  type: types.productAdd,
  payload: data,
});

export const editProduct = (data, err) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "serchs", data.id), data);

      dispatch(productEdit(data));

    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const productEdit = (data) => ({
  type: types.productEdit,
  payload: data,
});

export const deleteProduct = (id, err) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "serchs", id));

      dispatch(productDelete(id));

    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const productDelete = (id) => ({
  type: types.productDelete,
  payload: id,
});

export const activeProductCart = (data, err, added, already) => {
  return async (dispatch, getState) => {
    const { activeCartSelect } = await getState().cart;
    try {
      const match = await activeCartSelect.find((obj) => obj.id === data.id);
      if (match) {
        return Toast(already, "error", 5000);
      }

      Toast(added, "success", 5000);
      
      dispatch(cartProductActive(data));
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

export const cartProductActive = (data) => ({
  type: types.productActiveCart,
  payload: data,
});

export const saveProductCart = (data, err) => {
  return async (dispatch, getState) => {
    const { saveCartSelect } = await getState().save;
    try {
      const match = await saveCartSelect.find((obj) => obj?.id === data.id);
      if (match) {
        dispatch(deleteProductSave(data.id));
      } else {
        dispatch(cartProductSave(data));
      }
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const cartProductSave = (data) => ({
  type: types.productSaveCart,
  payload: data,
});

export const deleteProductSave = (id) => ({
  type: types.productDeleteSave,
  payload: id,
});

export const cartSaveLatest = (data, err) => {
  return async (dispatch, getState) => {
    const { latestCartSelect } = await getState().latest;
    try {
      const match = await latestCartSelect.find((obj) => obj.id === data.id);
      if (!match) {
        dispatch(LatestSaveCart(data));
      }
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const LatestSaveCart = (data) => ({
  type: types.productSaveLatest,
  payload: data,
});

export const saveSale = (data = [], del, u) => {
  return async (dispatch) => {
    try {
      let list = [];
      data.map(async (item) => {
        item.cre = Date.now();
        // resta la cantidad del producto
        await dbProductEdit(item.product.id, "dbProEditOne", item.product.cnr);

        // agrega una compra
        const { id } = await addDoc(collection(db, "users", u, "buys"), {
          ...item,
        });

        list.push({
          ...item,
          id: (item.id = id),
        });

        await dispatch(activeProductList(list));
      });
    } catch (error) {
      Toast(del, "error", 5000);
    }
  };
};

export const activeProductList = (data) => ({
  type: types.productActive,
  payload: data,
});

export const saveSaleRevert = (data, err, u) => {
  return async (dispatch) => {
    try {
      await data.map(async (item) => {
        if (item.process === false) {
          const cnr = (await item.cnr) + item.cn;

          await dbProductEdit(item.id, "dbProEditOne", cnr);

          await deleteDoc(doc(db, "users", u, "buys", item.idP));

          await dispatch(deletecheckout(item.idP));
        }
      });
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const deletecheckout = (id) => ({
  type: types.checkoutDelete,
  payload: id,
});

// processReducer
export const closeR = () => ({
  type: types.productRevert,
});

export const deleteProductCart = (id) => ({
  type: types.productDeleteCart,
  payload: id,
});

export const closeActive = () => ({
  type: types.closeActive,
});

export const closeCartActive = () => ({
  type: types.closeCart,
});
