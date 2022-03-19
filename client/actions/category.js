import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

import Swal from "sweetalert2";

import { db } from "../firebase/config";

import { types } from "../type";

export const listDataCategory = (data) => {
  return async (dispatch) => {
    try {
      dispatch(categoryDataList(data));
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const categoryDataList = (data) => ({
  type: types.category,
  payload: data,
});

export const addCategory = (na) => {
  return async (dispatch) => {
    try {
      const { id } = await addDoc(collection(db, "categories"), {
        na,
      });
      dispatch(
        categoryAdd({
          na,
          id,
        })
      );
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const categoryAdd = (data) => ({
  type: types.categoryAdd,
  payload: data,
});

export const editCategory = (data) => {
  return async (dispatch) => {
    try {
      const dataRef = doc(db, "categories", data?.id);
      await updateDoc(dataRef, {
        na: data?.na,
      });
      dispatch(categoryEdit(data));
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const categoryEdit = (data) => ({
  type: types.categoryEdit,
  payload: data,
});

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      dispatch(categoryDelete(id));
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const categoryDelete = (id) => ({
  type: types.categoryDelete,
  payload: id,
});

export const activeCategory = (data) => ({
  type: types.categoryActive,
  payload: data,
});

export const closeCategory = () => ({
  type: types.closeActive,
});
