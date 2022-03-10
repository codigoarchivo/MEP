import { types } from "../type";

export const listData = (data) => {
  return async (dispatch) => {
    await dispatch(dataList(data));
  };
};
const dataList = (data) => ({
  type: types.serchList,
  payload: data,
});

//  const serchActive = (data) => {
//   return async (dispatch) => {
//     dispatch(activeSerch(data));
//   };
// };

export const activeSerch = (data) => ({
  type: types.serchActive,
  payload: data,
});

export const closeEverything = () => ({
  type: types.close,
});
