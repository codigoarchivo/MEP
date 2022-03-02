import React from "react";

import { Provider } from "react-redux";

import { chakra, ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { theme } from "../theme";

import Layout from "../components/layout/layout";

import { store } from "../store";

import Navbar from "../components/layout/nav/Navbar";
import Footer from "../components/layout/foo/Footer";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Layout>
        <Provider store={store}>
          <chakra.header>
            <Navbar />
          </chakra.header>
          <chakra.main>
            <Component {...pageProps} />
          </chakra.main>
          <chakra.footer w={"full"}>
            <Footer />
          </chakra.footer>
        </Provider>
      </Layout>
    </ChakraProvider>
  );
};

export default App;
