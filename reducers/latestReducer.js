import { types } from "../type";

const initialStates = {
  // lista de los ultimos productos agregados
  latestCartSelect: [],
};
export const latestReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productSaveLatest:
      return {
        ...state,
        latestCartSelect: [action.payload, ...state.latestCartSelect],
      };
    default:
      return state;
  }
};
