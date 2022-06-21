import { types } from "../type";

const initialStates = {
  // guardar productos lista de deseos
  saveCartSelect: [],
  // lista activa en el cart path: /cart
  activeCartSelect: [],
  // Chekea las compras path: /checkout
  activeSelectCheck: [],
};
export const processReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productSaveCart:
      return {
        ...state,
        saveCartSelect: [...state.saveCartSelect, action.payload],
      };
    case types.productDeleteSave:
      return {
        ...state,
        saveCartSelect: state.saveCartSelect.filter(
          (e) => e.id !== action.payload
        ),
      };
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
    //  close activeCartSelect path: /cart
    case types.closeActive:
      return {
        ...state,
        activeCartSelect: [],
      };
    //  close activeCartSelect && activeSelectCheck path: /checkout
    case types.productRevert:
      return {
        ...state,
        activeCartSelect: [],
        activeSelectCheck: [],
      };
    default:
      return state;
  }
};
