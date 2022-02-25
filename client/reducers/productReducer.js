import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
};
export const productReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.product:
      return {
        ...states,
        list: action.payload,
      };
    case types.productAdd:
      return {
        ...states,
        list: [action.payload, ...states.list],
      };
    case types.activeOrInactive:
      return {
        ...states,
        list: states.list.map((e) =>
          e.id === action.payload.id
            ? { ...e, estado: action.payload.estado }
            : e
        ),
      };
    case types.productImgActive:
      return {
        ...states,
        activeSelect: action.payload,
      };
    case types.closeActive:
      return {
        ...states,
        activeSelect: action.payload,
      };
    case types.productEdit:
      return {
        ...states,
        list: states.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        activeSelect: null,
      };
    case types.productDelete:
      return {
        ...states,
        list: states.list.filter((e) => e.id !== action.payload),
        activeSelect: null,
      };

    default:
      return states;
  }
};
