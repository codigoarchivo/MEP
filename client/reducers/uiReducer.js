import { types } from "../type";

const initialState = {
  loading: false,
};
export const uiReducer = (states = initialState, action) => {
  switch (action.type) {
    case types.uiStartLoading:
      return {
        ...states,
        loading: true,
      };
    case types.uiFinishLoading:
      return {
        ...states,
        loading: false,
      };
    default:
      return states;
  }
};
