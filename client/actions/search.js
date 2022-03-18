import Swal from "sweetalert2";

import { types } from "../type";

export const listData = (data) => {
  return async (dispatch) => {
    try {
      await dispatch(dataList(data));
    } catch (error) {
      // error
      Swal.fire("Error", error, "error");
    }
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
