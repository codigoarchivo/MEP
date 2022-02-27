import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { serchReducer } from "./serchReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  serch: serchReducer,
  category: categoryReducer,
  product: productReducer,
});
