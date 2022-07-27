import { types } from "../type";

const initialStates = {
  // Chekea las compras path: /checkout
  activeSelectCheck: [],
};
export const processReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productActive:
      return {
        ...state,
        activeSelectCheck: action.payload,
      };
    case types.checkoutDelete:
      return {
        ...state,
        activeSelectCheck: state.activeSelectCheck.filter(
          (e) => e.id !== action.payload
        ),
      };
    case types.productRevert:
      return {
        ...state,
        activeSelectCheck: [],
      };
    default:
      return state;
  }
};
