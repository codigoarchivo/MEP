import { types } from "../type";

export const list = (data) => {
  return async (dispacth) => {
    await dispacth(listProduct(data));
  };
};

const listProduct = (data) => ({
  type: types.productList,
  payload: data,
});
