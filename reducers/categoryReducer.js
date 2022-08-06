import { types } from "../type";

const initialStates = {
  list: [],
};
export const categoryReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.category:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.categoryAdd:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case types.categoryEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.categoryDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};
