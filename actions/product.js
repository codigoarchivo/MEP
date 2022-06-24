import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbProductEdit } from "../data/dbProducts";

import { db } from "../firebase/config";

import Toast from "../helpers/Toast";

import { types } from "../type";

export const listDataProduct = (data) => {
  return async (dispatch) => {
    try {
      if (data) {
        await dispatch(productDataList(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productDataList = (data) => ({
  type: types.product,
  payload: data || [],
});

export const serchProductList = (filtro) => {
  return async (dispatch) => {
    try {
      await dispatch(listProductSerch(filtro));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const listProductSerch = (data) => ({
  type: types.serchList,
  payload: data,
});

// Product path: /
export const productListIndex = (data) => ({
  type: types.productList,
  payload: data,
});

export const addProduct = (resData = {}) => {
  return async (dispatch) => {
    try {
      const { id } = await addDoc(collection(db, "serchs"), {
        ...resData,
      });

      const data = { ...id, ...resData };

      if (data) {
        dispatch(productAdd(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productAdd = (data) => ({
  type: types.productAdd,
  payload: data,
});

export const editProduct = (data) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "serchs", data.id), data);
      dispatch(productEdit(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productEdit = (data) => ({
  type: types.productEdit,
  payload: data,
});

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "serchs", id));
      dispatch(productDelete(id));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productDelete = (id) => ({
  type: types.productDelete,
  payload: id,
});

export const activeProductCart = (data) => {
  return async (dispatch, getState) => {
    const { activeCartSelect } = await getState().process;
    try {
      const match = await activeCartSelect.find((obj) => obj.id === data.id);
      if (match) {
        return Toast("Product already added to cart", "error", 5000);
      }

      Toast("Producto agregado al carrito", "success", 5000);
      dispatch(cartProductActive(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const cartProductActive = (data) => ({
  type: types.productActiveCart,
  payload: data,
});

export const saveProductCart = (data) => {
  return async (dispatch, getState) => {
    const { saveCartSelect } = await getState().process;
    try {
      const match = await saveCartSelect.find((obj) => obj?.id === data.id);
      if (match) {
        dispatch(deleteProductSave(data.id));
      } else {
        dispatch(cartProductSave(data));
      }
    } catch (error) {
      Toast("Al parecer hay un errordsdsd", "error", 5000);
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

export const cartSaveLatest = (data) => {
  return async (dispatch, getState) => {
    const { latestCartSelect } = await getState().product;
    try {
      const match = await latestCartSelect.find((obj) => obj.id === data.id);
      if (!match) {
        dispatch(LatestSaveCart(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const LatestSaveCart = (data) => ({
  type: types.productSaveLatest,
  payload: data,
});

export const saveSale = (data = []) => {
  return async (dispatch) => {
    try {
      const newData = data.map(async (item) => {
        // resta la cantidad del producto
        await dbProductEdit(item.product.id, "dbProEditOne", item.product.cnr);
        // agrega una compra
        const { id } = await addDoc(collection(db, "buys"), {
          ...item,
        });

        return {
          ...item,
          id: (item["id"] = id),
        };
      });

      dispatch(activeProduct(newData));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const saveSaleRevert = (data) => {
  return (dispatch) => {
    try {
      data.map(async (item) => {
        if (item.process === false) {
          const cnr = item.cnr + item.cn;
          await dbProductEdit(item.id, "dbProEditOne", cnr);
          await deleteDoc(doc(db, "buys", item.idP));
          await dispatch(closeRevert());
        }
      });
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const closeRevert = () => ({
  type: types.productRevert,
});

export const deleteProductCart = (id) => ({
  type: types.productDeleteCart,
  payload: id,
});

const activeProduct = (data) => ({
  type: types.productActive,
  payload: data,
});

export const activeProductList = (data) => ({
  type: types.productActive,
  payload: data,
});

export const closeActive = () => ({
  type: types.closeActive,
});
