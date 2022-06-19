import { types } from "../type";

// orders
export const cheListAllActive = (data) => ({
  type: types.cheListAllActive,
  payload: data,
});

export const checkRevert = () => ({
  type: types.cheClear,
});
