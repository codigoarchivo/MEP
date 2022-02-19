import { types } from "../type";

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

export const closeEverything = () => ({
  type: types.close,
});
