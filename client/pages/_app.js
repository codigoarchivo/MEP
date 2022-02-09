import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "../theme";
import Layout from "../components/layout/layout";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
