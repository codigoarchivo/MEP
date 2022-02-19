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
