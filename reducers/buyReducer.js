import { types } from "../type";

const initialStates = {
  buy: [],
};

export const buyReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productActive:
      return {
        ...state,
        buy: [...action.payload],
      };
    case types.checkoutDelete:
      return {
        ...state,
        buy: state.buy.filter((e) => e.id !== action.payload),
      };
    case types.cheListAllCleBu:
      return {
        ...state,
        buy: [],
      };
    default:
      return state;
  }
};
