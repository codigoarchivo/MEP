import { types } from "../type";

const initialStates = {
  // list genereal path: /product[uid]
  list: [],
  // busqueda por el porcentaje path: /search
  listSerch: [],
  // lista de productos path: /
  listData: [],
  // lista de los ultimos productos agregados
  latestCartSelect: [],
};
export const productReducer = (state = initialStates, action) => {
  switch (action.type) {
    // list de la aplicación
    case types.product:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.productAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.productEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        listData: state.listData.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        listSerch: state.listSerch.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.productDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
        listData: state.listData.filter((e) => e.id !== action.payload),
        listSerch: state.listSerch.filter((e) => e.id !== action.payload),
      };
    case types.productList:
      return {
        ...state,
        listData: [...action.payload],
      };
    case types.serchList:
      return {
        ...state,
        listSerch: [...action.payload],
      };
    case types.productSaveLatest:
      return {
        ...state,
        latestCartSelect: [action.payload, ...state.latestCartSelect],
      };
    default:
      return state;
  }
};
