import { types } from "../type";

const initialStates = {
  list: [],
  history: [],
  message: [],
  sale: [],
  buy: [],
};

export const checkoutReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.checkoutList:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.cheListAllHistory:
      return {
        ...state,
        history: [...action.payload],
      };
    case types.cheListAllHistoryEdit:
      return {
        ...state,
        history: state.history.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.checkoutAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.cheListMessage:
      return {
        ...state,
        message: [...action.payload],
      };
    case types.cheListMessageClear:
      return {
        ...state,
        message: [],
      };
    case types.cheListAllSa:
      return {
        ...state,
        sale: [...action.payload],
      };
    case types.cheListAllCle:
      return {
        ...state,
        sale: [],
      };
    case types.cheListAllBu:
      return {
        ...state,
        buy: [...action.payload],
      };
    case types.cheListAllCleBu:
      return {
        ...state,
        buy: [],
      };
    default:
      return state;
  }
};
