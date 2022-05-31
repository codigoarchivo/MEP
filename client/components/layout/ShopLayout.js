import React from "react";

import { Provider } from "react-redux";

import { store } from "../../store";

import Head from "next/head";

import { chakra } from "@chakra-ui/react";

import Navbar from "./nav/Navbar";
import Footer from "./foo/Footer";

import AuthChange from "../../helpers/AuthChange";

const ShopLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Market | Edgars Pendulum</title>
      </Head>
      <Provider store={store}>
        <AuthChange />
        <chakra.header>
          <Navbar />
        </chakra.header>

        <chakra.main>{children}</chakra.main>

        <chakra.footer w={"full"}>
          <Footer />
        </chakra.footer>
      </Provider>
    </>
  );
};

export default ShopLayout;
