import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";
import { store } from "../data/store";
import { types } from "../type";

export const listDataUser = (id) => {
  // TODO api list uid
  return async (dispatch) => {
    const data = store.filter(({ uid }) => {
      return uid.toLowerCase().includes(id);
    });

    await dispatch(dataListUser(data));
  };
};

const dataListUser = (data) => ({
  type: types.product,
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

export const addDataUser = (data) => {
  // TODO api Add data
  return async (dispatch) => {
    dispatch(dataAddUser(data));
  };
};

const dataAddUser = (data) => ({
  type: types.productAdd,
  payload: data,
});

export const startUploading = (file) => {
  return async (dispatch) => {
    Swal.fire({
      title: "uploading...",
      text: "Please wait...",
      allowOutsideClick: false,

      didOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    dispatch(fileImgCont(fileUrl));
    Swal.close();
  };
};

const fileImgCont = (fileUrl) => ({
  type: types.productImgActive,
  payload: fileUrl,
});

export const editDataUser = (data) => {
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

export const closeActive = () => ({
  type: types.closeActive,
  payload: null,
});
