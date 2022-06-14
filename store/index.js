import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";

import thunk from "redux-thunk";

import { persistStore } from "redux-persist";

import { persistingReducer } from "../reducers";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export const store = createStore(
  persistingReducer,

  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
