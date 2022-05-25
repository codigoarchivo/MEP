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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
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
