import React from "react";

import { Provider } from "react-redux";

import { persistStore } from "redux-persist";

import { store } from "../store";

import { PersistGate } from "redux-persist/integration/react";

import { Center, ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";

const App = ({ Component, pageProps }) => {
  const persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Center mt={10}>loading</Center>} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
