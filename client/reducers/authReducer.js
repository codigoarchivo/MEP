import { types } from "../type";

const initialStates = {
  activeSelect: null,
};

export const authReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {
        activeSelect: null,
      };
    case types.active:
      return {
        activeSelect: action.payload,
      };
    case types.closeActive:
      return {
        activeSelect: null,
      };

    default:
      return states;
  }
};
