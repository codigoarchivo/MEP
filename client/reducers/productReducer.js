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
    case types.productImgActive:
      return {
        ...states,
        activeSelect: { ...states.activeSelect, image: action.payload },
      };
    case types.active:
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
        activeimg: null,
      };
    case types.productDelete:
      return {
        ...states,
        list: states.list.filter((e) => e.id !== action.payload),
        activeSelect: null,
        activeimg: null,
      };

    default:
      return states;
  }
};
