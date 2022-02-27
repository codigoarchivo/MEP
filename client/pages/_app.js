import React, { createContext, useEffect, useState } from "react";

import { Provider } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { theme } from "../theme";

import Layout from "../components/layout/layout";

import { store } from "../store";

import { auth } from "../firebase/config";

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState({
    uid: "",
    name: "",
  });
  const [checking, setChecking] = useState(true);
  const [isloggedIn, setIsloggedIn] = useState(false);

  const UserContext = createContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
        });
        setIsloggedIn(true);
      } else {
        setIsloggedIn(false);
      }
      setChecking(false);
    });
  }, [setUser, setChecking, setIsloggedIn]);

  return (
    <UserContext.Provider value={{ user, checking, isloggedIn }}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </ChakraProvider>
    </UserContext.Provider>
  );
};

export default App;
