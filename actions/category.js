import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Toast from "../helpers/Toast";

import { types } from "../type";

export const listDataCategory = (data, err) => {
  return async (dispatch) => {
    try {
      if (data) {
        await dispatch(categoryDataList(data));
      }
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const categoryDataList = (data) => ({
  type: types.category,
  payload: data,
});

export const categoryListConfig = (data) => ({
  type: types.categoryList,
  payload: data,
});

export const addCategory = (na, err) => {
  return async (dispatch) => {
    try {
      const { id } = await addDoc(collection(db, "categories"), {
        na,
      });
      const data = { id, na };
      if (data) {
        dispatch(categoryAdd(data));
      }
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const categoryAdd = (data) => ({
  type: types.categoryAdd,
  payload: data,
});

export const editCategory = (na, id, err) => {
  return async (dispatch) => {
    try {
      const dataRef = doc(db, "categories", id);
      await updateDoc(dataRef, {
        na,
      });

      const data = { id, na };

      if (data) {
        dispatch(categoryEdit(data));
      }
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const categoryEdit = (data) => ({
  type: types.categoryEdit,
  payload: data,
});

export const deleteCategory = (id, err) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      dispatch(categoryDelete(id));
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};

const categoryDelete = (id) => ({
  type: types.categoryDelete,
  payload: id,
});

export const activeCategoryOld = (data) => ({
  type: types.categoryActiveOld,
  payload: data,
});

export const activeCategory = (data) => ({
  type: types.categoryActive,
  payload: data,
});

export const closeCategory = () => ({
  type: types.closeActive,
});
