import { types } from "../type";
import { store } from "../data/store";

export const listData = () => {
  // api
  return async (dispatch) => {
    await dispatch(dataList(store));
  };
};

const dataList = (data) => ({
  type: types.serchList,
  payload: data,
});

export const listDataPerfil = (id) => {
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
