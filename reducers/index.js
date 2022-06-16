import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web


import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { checkoutReducer } from "./checkoutReducer";
import { userReducer } from "./userReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "category", "product", "checkout", "user"],
  blacklist: ["ui"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  checkout: checkoutReducer,
  user: userReducer,
  ui: uiReducer,
});

export const persistingReducer = persistReducer(persistConfig, rootReducer);
