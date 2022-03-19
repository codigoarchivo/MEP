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
    case types.categoryEdit:
      return {
        ...states,
        list: states.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        activeSelect: null,
      };
    case types.categoryDelete:
      return {
        ...states,
        list: states.list.filter((e) => e.id !== action.payload),
        activeSelect: null,
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
