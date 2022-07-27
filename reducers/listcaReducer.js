import { types } from "../type";

const initialStates = {
  listData: [],
};
export const listcaReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.categoryList:
      return {
        ...state,
        listData: [...action.payload],
      };
    case types.categoryEdit:
      return {
        ...state,
        listData: state.listData.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.categoryDelete:
      return {
        ...state,
        listData: state.listData.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};
