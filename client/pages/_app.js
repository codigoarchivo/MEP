import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "../theme";
import "../theme/styles.css";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
