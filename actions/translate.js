import { types } from "../type";

export const listTraslate = (data) => ({
  type: types.translateList,
  payload: data,
});

export const clearTraslate = () => ({
  type: types.closeTranslate,
});
