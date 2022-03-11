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

export const activeCategory = (data) => ({
  type: types.categoryActive,
  payload: data,
});

export const closeCategory = () => ({
  type: types.closeActive,
});
