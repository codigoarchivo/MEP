import React from "react";

import { Provider } from "react-redux";

import { persistStore } from "redux-persist";

import { store } from "../store";

import { PersistGate } from "redux-persist/integration/react";

import { Center, ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";

import { Breakpoints } from "../helpers/Breakpoints";

const App = ({ Component, pageProps }) => {
  const { points25 } = Breakpoints();
  return (
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate
            loading={
              <Center h={"calc(100vh - 50px)"} fontSize={points25}>
                loading
              </Center>
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
