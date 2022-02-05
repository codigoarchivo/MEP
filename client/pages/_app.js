import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
