import { types } from "../type";

const initialStates = {
  list: [],
  listPerfil: [],
  activeSelect: null,
};

export const serchReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.serchList:
      return {
        ...state,
        list: action.payload,
      };
    case types.serchListPerfil:
      return {
        ...state,
        listPerfil: action.payload,
      };
    case types.close:
      return {
        list: [],
        listPerfil: [],
        activeSelect: null,
      };

    default:
      return state;
  }
};
