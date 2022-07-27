import { types } from "../type";

const initialStates = {
  sale: [],
};
export const saleReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.cheListAllSa:
      return {
        ...state,
        sale: [...action.payload],
      };
    case types.cheListAllCle:
      return {
        ...state,
        sale: [],
      };
    default:
      return state;
  }
};
