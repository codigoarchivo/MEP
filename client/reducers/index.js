import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { serchReducer } from "./serchReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";

const persistConfig = {
  key: "category",
  storage,
};

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  serch: serchReducer,
  category: persistReducer(persistConfig, categoryReducer) ,
  product: productReducer,
});
