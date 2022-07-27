import { types } from "../type";

const initialStates = {
  // lista activa en el cart path: /cart
  activeCartSelect: [],
};
export const cartReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productActiveCart:
      return {
        ...state,
        activeCartSelect: [...state.activeCartSelect, action.payload],
      };
    case types.productDeleteCart:
      return {
        ...state,
        activeCartSelect: state.activeCartSelect.filter(
          (e) => e.id !== action.payload
        ),
      };
    case types.closeCart:
      return {
        ...state,
        activeCartSelect: [],
      };
    default:
      return state;
  }
};
