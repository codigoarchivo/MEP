import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
};
export const categoryReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.category:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.categoryActive:
      return {
        ...state,
        activeSelect: action.payload,
      };
    case types.categoryAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.categoryEdit:
      return {
        ...state,
        activeSelect: null,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.categoryDelete:
      return {
        ...state,
        activeSelect: null,
        list: state.list.filter((e) => e.id !== action.payload),
      };
    case types.closeActive:
      return {
        ...state,
        activeSelect: null,
      };

    default:
      return state;
  }
};
