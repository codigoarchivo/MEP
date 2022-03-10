import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

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

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "category", "product", "ui", "serch"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
