import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { checkoutReducer } from "./checkoutReducer";
import { userReducer } from "./userReducer";
import { salesReducer } from "./salesReducer";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
    

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  checkout: checkoutReducer,
  user: userReducer,
  sale: salesReducer,
  ui: uiReducer,
});

export const persistingReducer = persistReducer(persistConfig, rootReducer);
