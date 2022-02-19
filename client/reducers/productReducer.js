import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
  activeImg: null,
};
export const productReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.product:
      return {
        ...states,
        list: action.payload,
      };

    default:
      return states;
  }
};
