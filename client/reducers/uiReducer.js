import { types } from "../type";

const initialState = {
  loading: false,
  activeDisabled: null,
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
    case types.uiActiveEnds:
      return {
        ...states,
        activeDisabled: action.payload,
      };
    default:
      return states;
  }
};
