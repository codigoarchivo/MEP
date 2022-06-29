import { types } from "../type";

const initialStates = {
  t: {},
};

export const translateReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.translateList:
      return {
        ...states,
        t: action.payload,
      };
    case types.closeTranslate:
      return {
        ...states,
        t: {},
      };
    default:
      return states;
  }
};
