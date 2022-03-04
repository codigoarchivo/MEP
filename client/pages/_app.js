import React from "react";

import { Provider } from "react-redux";

import { chakra, ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { theme } from "../theme";

import { store } from "../store";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>

        <chakra.main>
          <Component {...pageProps} />
        </chakra.main>
        
      </Provider>
    </ChakraProvider>
  );
};

export default App;
