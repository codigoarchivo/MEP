import { types } from "../type";

const initialStates = {
  activeSelect: null,
};

export const authReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...states,
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {
        ...states,
        activeSelect: null,
      };
    case types.active:
      return {
        ...states,
        activeSelect: action.payload,
      };
    case types.closeActive:
      return {
        ...states,
        activeSelect: null,
      };

    default:
      return states;
  }
};
