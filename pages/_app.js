import React from "react";

import { Provider } from "react-redux";

import { persistor, store } from "../store";

import { PersistGate } from "redux-persist/integration/react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
