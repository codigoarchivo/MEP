import { types } from "../type";

const initialStates = {
  list: [],
  history: [],
  active: null,
  verify: null,
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
    case types.cheActiveVerify:
      return {
        ...state,
        verify: { ...action.payload },
      };
    case types.cheClearVerify:
      return {
        ...state,
        verify: null,
      };
    default:
      return state;
  }
};
