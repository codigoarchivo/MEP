import { addDoc, collection } from "firebase/firestore";

import Swal from "sweetalert2";

import { db } from "../firebase/config";

import { types } from "../type";

export const listDataCategory = (data) => {
  return async (dispatch) => {
    dispatch(categoryDataList(data));
  };
};

const categoryDataList = (data) => ({
  type: types.category,
  payload: data,
});

export const addCategory = (na) => {
  return async (dispatch, getState) => {
    // getState uid
    try {
      const { activeSelect } = getState().auth;
      
      const { id } = await addDoc(
        collection(db, "categories", `${activeSelect?.uid}`),
        {
          na,
        }
      );

      if (id && na) {
        dispatch(
          categoryAdd({
            na,
            id,
          })
        );
      }
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const categoryAdd = (data) => ({
  type: types.categoryAdd,
  payload: data,
});

export const activeCategory = (data) => ({
  type: types.categoryActive,
  payload: data,
});

export const closeCategory = () => ({
  type: types.closeActive,
});
