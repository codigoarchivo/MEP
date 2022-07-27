import { types } from "../type";

const initialStates = {
  message: [],
};

export const messageReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.cheListMessage:
      return {
        ...state,
        message: [...action.payload],
      };
    case types.cheListMessageEdit:
      return {
        ...state,
        message: state.message.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.cheListMessageClear:
      return {
        ...state,
        message: [],
      };
    default:
      return state;
  }
};
