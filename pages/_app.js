import React from "react";

import { Provider } from "react-redux";

import { persistStore } from "redux-persist";

import { store } from "../store";

import { PersistGate } from "redux-persist/integration/react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";

const App = ({ Component, pageProps }) => {
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
