import { types } from "../type";

const initialStates = {
  // guardar productos lista de deseos
  saveCartSelect: [],
};
export const saveReducer = (state = initialStates, action) => {
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
    default:
      return state;
  }
};
