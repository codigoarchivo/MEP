import { types } from "../type";

const initialStates = {
  // lista de productos path: /
  listData: [],
};
export const listReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productList:
      return {
        ...state,
        listData: [...action.payload],
      };
    case types.productEdit:
      return {
        ...state,
        listData: state.listData.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.productDelete:
      return {
        ...state,
        listData: state.listData.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};
