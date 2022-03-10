import React from "react";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { theme } from "../theme";

import { persistor, store } from "../store";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
