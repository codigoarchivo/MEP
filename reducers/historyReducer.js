import { types } from "../type";

const initialStates = {
  history: [],
};

export const historyReducer = (state = initialStates, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
