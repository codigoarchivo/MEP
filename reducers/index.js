import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { buyReducer } from "./buyReducer";
import { saleReducer } from "./saleReducer";
import { processReducer } from "./processReducer";
import { historyReducer } from "./historyReducer";
import { messageReducer } from "./messageReducer";
import { serchReducer } from "./serchReducer";
import { listReducer } from "./listReducer";
import { latestReducer } from "./latestReducer";
import { listcaReducer } from "./listcaReducer";
import { saveReducer } from "./saveReducer";
import { cartReducer } from "./cartReducer";

import { types } from "../type";

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
  blacklist: ["ui", "list", "serch", "message"],
};

const appReducer = combineReducers({
  ui: uiReducer,
  list: listReducer,
  listca: listcaReducer,
  latest: latestReducer,
  auth: authReducer,
  process: processReducer,
  save: saveReducer,
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
  serch: serchReducer,
  history: historyReducer,
  buy: buyReducer,
  message: messageReducer,
  sale: saleReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.logout) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const persistingReducer = persistReducer(persistConfig, rootReducer);
