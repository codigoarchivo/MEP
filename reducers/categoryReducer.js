import { types } from "../type";

const initialStates = {
  list: [],
  listData: [],
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
        list: [...state.list, action.payload],
      };
    case types.categoryEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        listData: state.listData.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.categoryDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
        listData: state.listData.filter((e) => e.id !== action.payload),
      };
    case types.categoryList:
      return {
        ...state,
        listData: [...action.payload],
      };
    default:
      return state;
  }
};
