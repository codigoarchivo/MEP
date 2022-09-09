import React from "react";

import { Provider } from "react-redux";

import { persistStore } from "redux-persist";

import { store } from "../store";

import { PersistGate } from "redux-persist/integration/react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => {

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate
          loading={
            <div className="box__content">
              <div className="spinner"></div>
            </div>
          }
          persistor={persistStore(store)}
        >
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
