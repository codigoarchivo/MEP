import { types } from "../type";

const initialStates = {
  list: [],
  activeList: null,
};

export const serchReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.serchList:
      return {
        ...states,
        list: action.payload,
      };
    case types.serchActive:
      return {
        ...states,
        activeList: action.payload,
      };
    case types.close:
      return {
        list: [],
      };
    case types.productAdd:
      return {
        ...states,
        list: [action.payload, ...states.list],
      };

    default:
      return states;
  }
};
