import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
};

export const productReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productList:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};
