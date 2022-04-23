import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
};

export const checkoutReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.checkoutList:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.checkoutAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};
