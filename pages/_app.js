import React from "react";

import { Provider } from "react-redux";

import { persistor, store } from "../store";

import { PersistGate } from "redux-persist/integration/react";

import { ChakraProvider } from "@chakra-ui/react";

import { UIContext } from "../context/UIContext";

import { theme } from "../theme";

import AuthStageChanfe from "../helpers/AuthStageChanfe";


const App = ({ Component, pageProps }) => {
  const { identifier } = AuthStageChanfe();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UIContext.Provider value={{ ...identifier }}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </UIContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
