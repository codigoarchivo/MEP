import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
  activeCartSelect: [],
};
export const productReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.product:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.productAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.productActive:
      return {
        ...state,
        activeSelect: action.payload,
      };
    case types.productActiveCart:
      return {
        ...state,
        activeCartSelect: [...state.activeCartSelect, action.payload],
      };
    case types.productEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        activeSelect: null,
      };
    case types.productDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
        activeSelect: null,
      };
    case types.closeActive:
      return {
        ...state,
        activeSelect: action.payload,
      };
    default:
      return state;
  }
};
