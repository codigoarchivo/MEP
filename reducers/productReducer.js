import { types } from "../type";

const initialStates = {
  // list genereal path: /product[uid]
  list: [],
};
export const productReducer = (state = initialStates, action) => {
  switch (action.type) {
    // list de la aplicación
    case types.product:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.productAdd:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case types.productEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.productDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};
