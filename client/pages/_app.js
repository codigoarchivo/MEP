import React from "react";

import { Provider } from "react-redux";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { theme } from "../theme";

import Layout from "../components/layout/layout";

import { store } from "../store";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </ChakraProvider>
  );
};

export default App;
