import { types } from "../type";
import { store } from "../data/store";

export const listData = (data) => {
  // TODO api
  return async (dispatch) => {
    await dispatch(dataList(data));
  };
};

const dataList = (data) => ({
  type: types.serchList,
  payload: data,
});

export const listDataPerfil = (id) => {
  // TODO api
  return async (dispatch) => {
    const data = store.filter(({ uid }) => {
      return uid.toLowerCase().includes(id);
    });

    await dispatch(dataListPerfil(data));
  };
};

const dataListPerfil = (data) => ({
  type: types.serchListPerfil,
  payload: data,
});

export const closeEverything = () => ({
  type: types.close,
});
