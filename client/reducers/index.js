import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["product", "ui", "category"],
};
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export const persistingReducer = persistReducer(persistConfig, rootReducer);
