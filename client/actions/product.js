import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Toast from "../helpers/Toast";

import { types } from "../type";

export const listDataProduct = (data) => {
  return async (dispatch) => {
    try {
      await dispatch(productDataList(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productDataList = (data) => ({
  type: types.product,
  payload: data,
});

export const addProduct = (resData) => {
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
      await setDoc(doc(db, "serchs", data?.id), data);
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

export const productActiveOrInactive = (data) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "serchs", data?.id), data);
      dispatch(activeOrInactiveProduct(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const activeOrInactiveProduct = (data) => ({
  type: types.productEdit,
  payload: data,
});

export const activeProductCart = (data) => {
  return async (dispatch, getState) => {
    const { activeCartSelect } = await getState().product;
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
    const { saveCartSelect } = await getState().product;
    try {
      const match = await saveCartSelect.find((obj) => obj?.id === data.id);
      if (match) {
        dispatch(deleteProductSave(data.id));
      } else {
        dispatch(cartProductSave(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
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

export const categorySerchProduct = (id) => {
  const q = query(collection(db, "serchs"), where("ct", "==", id), limit(25));
  return async (dispatch) => {
    try {
      const el = await getDocs(q);

      if (el.docs.length === 0) {
        dispatch(productSerchCategoryClose());
        return Toast(`Se encontro: ${el.docs.length} resultado`, "info", 5000);
      }

      const data = el.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (data.length > 0) {
        Toast(`Se encotro: ${data.length} resultado`, "success", 5000);
        dispatch(productSerchCategory(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productSerchCategory = (data) => ({
  type: types.productCategory,
  payload: data,
});

const productSerchCategoryClose = () => ({
  type: types.productCategoryClose,
});

export const serchProductList = (data) => {
  const q = query(collection(db, "serchs"), orderBy("na", "asc"));
  return async (dispatch) => {
    try {
      const el = await getDocs(q);

      const filtro = el.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((obj) => obj.na.toLowerCase().includes(data.toLowerCase()))
        .slice(0, 25);

      if (filtro.length === 0) {
        dispatch(listProductSerch(filtro));
        return Toast(`Se encontro: ${filtro.length} resultado`, "info", 5000);
      } else {
        Toast(`Se encotro: ${filtro.length} resultado`, "success", 5000);
        dispatch(productDataList(filtro));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const listProductSerch = () => ({
  type: types.emptySerch,
});

export const activeProduct = (data) => ({
  type: types.productActive,
  payload: data,
});

export const deleteProductCart = (id) => ({
  type: types.productDeleteCart,
  payload: id,
});

export const closeActive = () => ({
  type: types.closeActive,
  payload: null,
});
