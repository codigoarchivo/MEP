import React from "react";

import Head from "next/head";

import { chakra } from "@chakra-ui/react";

import Navbar from "./nav/Navbar";
import Footer from "./foo/Footer";

import AuthChange from "../../helpers/AuthChange";
import WithSubnavigation from "./nav/WithSubnavigation";

const ShopLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Market | Edgars Pendulum"}</title>
      </Head>

      {/* <AuthChange /> */}
      <chakra.header>
        <WithSubnavigation />
        <Navbar />
      </chakra.header>

      <chakra.main>
        <AuthChange />
        {children}
      </chakra.main>

      <chakra.footer w={"full"}>
        <Footer />
      </chakra.footer>
    </>
  );
};

export default ShopLayout;
