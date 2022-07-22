import { types } from "../type";

const initialState = {
  loading: false,
  change: false,
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
    case types.uiEn:
      return {
        ...states,
        change: false,
      };
    case types.uiEs:
      return {
        ...states,
        change: true,
      };
    default:
      return states;
  }
};
