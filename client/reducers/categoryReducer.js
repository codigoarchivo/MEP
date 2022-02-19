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

    default:
      return states;
  }
};
