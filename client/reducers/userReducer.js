import { types } from "../type";

const initialStates = {
  list: [],
  activeUsuario: null,
};
export const userReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.user:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.userAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.userEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.userDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
      };
    case types.userActive:
      return {
        ...state,
        activeUsuario: action.payload,
      };
    default:
      return state;
  }
};
