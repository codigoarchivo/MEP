import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { serchReducer } from "./serchReducer";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
  serch: serchReducer,
  category: categoryReducer,
  product: productReducer,
});
