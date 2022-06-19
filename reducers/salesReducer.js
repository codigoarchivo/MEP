import { types } from "../type";

const initialStates = {
  active: {},
};

export const salesReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.cheListAllActive:
      return {
        ...state,
        active: { ...action.payload },
      };
    case types.cheClear:
      return {
        ...state,
        active: {},
      };
    default:
      return state;
  }
};
