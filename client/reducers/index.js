import { combineReducers } from "redux";
import { serchReducer } from "./serchReducer";

export const rootReducer = combineReducers({
  serch: serchReducer,
});
