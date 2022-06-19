import { types } from "../type";

const initialStates = {
  list: [],
  history: [],
  daVery: {},
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
    case types.cheActiveVerify:
      return {
        ...state,
        daVery: { ...action.payload },
      };
    case types.cheClearVerify:
      return {
        ...state,
        daVery: {},
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
