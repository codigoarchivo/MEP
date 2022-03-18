import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
};
export const categoryReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.category:
      return {
        ...states,
        list: action.payload,
      };
    case types.categoryActive:
      return {
        ...states,
        activeSelect: action.payload,
      };
    case types.categoryAdd:
      return {
        ...states,
        list: [...states.list, action.payload],
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
