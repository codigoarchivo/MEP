import { store } from "../data/store";
import { types } from "../type";

export const listDataUser = (id) => {
  // TODO api
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

export const editDataUser = (data) => {
  // TODO continuer product
  return async (dispatch) => {
    dispatch(dataEditUser());
  };
};

const dataEditUser = (data) => ({
  type: types.productEdit,
  payload: data,
});
