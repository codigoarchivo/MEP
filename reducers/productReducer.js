import { types } from "../type";

const initialStates = {
  // list genereal
  list: [],
  // busqueda por el porcentaje /search
  listSerch: [],
  // lista de productos /product/[product]
  listData: [],
  saveCartSelect: [],
  // lista de los ultimos productos agregados 
  latestCartSelect: [],
  activeCartSelect: [],
  activeSelectCheck: [],
  productSerchCategory: null,
};
export const productReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.productList:
      return {
        ...state,
        listData: [...action.payload],
      };
    case types.product:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.serchList:
      return {
        ...state,
        listSerch: [...action.payload],
      };
    case types.productAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.productActive:
      return {
        ...state,
        activeSelectCheck: action.payload,
      };
    case types.productSaveCart:
      return {
        ...state,
        saveCartSelect: [...state.saveCartSelect, action.payload],
      };
    case types.productActiveCart:
      return {
        ...state,
        activeCartSelect: [...state.activeCartSelect, action.payload],
      };
    case types.productSaveLatest:
      return {
        ...state,
        latestCartSelect: [action.payload, ...state.latestCartSelect],
      };
    case types.productCategory:
      return {
        ...state,
        productSerchCategory: action.payload,
      };
    case types.productEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
      };
    case types.productDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
      };
    case types.productDeleteCart:
      return {
        ...state,
        activeCartSelect: state.activeCartSelect.filter(
          (e) => e.id !== action.payload
        ),
      };
    case types.checkoutDelete:
      return {
        ...state,
        activeSelectCheck: state.activeSelectCheck.filter(
          (e) => e.id !== action.payload
        ),
      };
    case types.productDeleteSave:
      return {
        ...state,
        saveCartSelect: state.saveCartSelect.filter(
          (e) => e.id !== action.payload
        ),
      };
    case types.productCategoryClose:
      return {
        ...state,
        productSerchCategory: [],
      };
    case types.emptySerch:
      return {
        ...state,
        listSerch: [],
      };
    case types.closeActive:
      return {
        ...state,
        activeCartSelect: [],
      };
    case types.closeActive:
      return {
        ...state,
        activeCartSelect: [],
      };
    case types.productRevert:
      return {
        ...state,
        activeCartSelect: [],
        activeSelectCheck: [],
      };
    default:
      return state;
  }
};
