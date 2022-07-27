import { types } from "../type";

const initialStates = {
  // busqueda por el porcentaje path: /search
  listSerch: [],
};
export const serchReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.serchList:
      return {
        ...state,
        listSerch: [...action.payload],
      };
    case types.productEdit:
      return {
        ...state,
        listSerch: state.listSerch.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.productDelete:
      return {
        ...state,
        listSerch: state.listSerch.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};
