import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

import Swal from "sweetalert2";

import { db } from "../firebase/config";

import { types } from "../type";

export const listDataProduct = (data) => {
  return async (dispatch) => {
    try {
      await dispatch(productDataList(data));
    } catch (error) {
      Swal.fire("Error", error, "error");
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
      Swal.fire("Error", error, "error");
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
      Swal.fire("Error", error, "error");
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
      Swal.fire("Error", error, "error");
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
      Swal.fire("Error", error, "error");
    }
  };
};

const activeOrInactiveProduct = (data) => ({
  type: types.productEdit,
  payload: data
});

export const activeProduct = (data) => ({
  type: types.productActive,
  payload: data,
});

export const closeActive = () => ({
  type: types.closeActive,
  payload: null,
});
