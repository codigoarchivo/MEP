import React from "react";

import Head from "next/head";

import { WithSubnavigation } from "./nav/WithSubnavigation";

import { Footer } from "./foo/Footer";
import { AuthStateChange } from "../../helpers/AuthStateChange";

const ShopLayout = ({ children, title }) => {
  const origin =
    (typeof window !== "undefined" && window.location.origin) || "";

  return (
    <>
      <Head>
        <title>{title || "Market | Edgars Pendulum"}</title>
        <meta name="author" content="Edgar Marcano" />
        <meta name="description" content={`energy for you brand ${title}`} />
        <meta name="keywords" content={`${title}, energy for you brand`} />

        <meta property="og:title" content={`energy for you brand ${title}`} />
        <meta
          property="og:description"
          content={`energy for you brand ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/logo.png`} />
      </Head>

      {/* <AuthChange /> */}
      <header>
        <WithSubnavigation />
      </header>
      <AuthStateChange />
      <main>{children}</main>

      <footer w={"full"}>
        <Footer />
      </footer>
    </>
  );
};

export default ShopLayout;
