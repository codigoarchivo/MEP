import { addDoc, collection } from "firebase/firestore";

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

export const dataActive = (data) => {
  return async (dispatch) => {
    await dispatch(activeData(data));
  };
};

const activeData = (data) => ({
  type: types.active,
  payload: data,
});

export const editDataUser = (data) => {
  delete data.word;
  // TODO api update data
  return async (dispatch) => {
    dispatch(dataEditUser(data));
  };
};

const dataEditUser = (data) => ({
  type: types.productEdit,
  payload: data,
});

export const deleteDataUser = (id) => {
  // TODO api delete id
  return async (dispatch) => {
    dispatch(dataDeleteUser(id));
  };
};

const dataDeleteUser = (id) => ({
  type: types.productDelete,
  payload: id,
});

export const activeProduct = (data) => ({
  type: types.productActive,
  payload: data,
});

export const activeProductImg = (data) => ({
  type: types.activeOrInactive,
  payload: data,
});

export const closeActive = () => ({
  type: types.closeActive,
  payload: null,
});
