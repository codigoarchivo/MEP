import { types } from "../type";

const initialStates = {
  activeSelect: {},
};

export const authReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...states,
        activeSelect: action.payload,
      };
    case types.logout:
      return {
        ...states,
        activeSelect: {},
      };
    case types.active:
      return {
        ...states,
        activeSelect: action.payload,
      };
    case types.closeActive:
      return {
        ...states,
        activeSelect: {},
      };

    default:
      return states;
  }
};
