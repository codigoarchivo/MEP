import { types } from "../type";

const initialStates = {
  buy: [],
};

export const buyReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.cheListAllBu:
      return {
        ...state,
        buy: [...action.payload],
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
