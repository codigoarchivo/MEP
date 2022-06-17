import { types } from "../type";

const initialStates = {
  list: [],
  active: null,
  history: [],
};

export const checkoutReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.checkoutList:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.cheListAllHistory:
      return {
        ...state,
        history: [...action.payload],
      };
    case types.checkoutAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.cheListAllActive:
      return {
        ...state,
        active: { ...action.payload },
      };
    case types.cheClear:
      return {
        ...state,
        active: null,
      };
    default:
      return state;
  }
};
