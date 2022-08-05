import React from "react";

import { AuthStateChange } from "../../helpers/AuthStateChange";

import Head from "next/head";

import { WithSubnavigation } from "./nav/WithSubnavigation";

import { Footer } from "./foo/Footer";
import { ModalEmail } from "./nav/ModalEmail";

const ShopLayout = ({ children, title }) => {
  const origin =
    (typeof window !== "undefined" && window.location.origin) || "";
    
  return (
    <>
      <Head>
        <title>{title || "Energía para tu marca"}</title>
        <meta name="author" content="Edgar Marcano" />
        <meta name="description" content={`energía para tu marca ${title}`} />
        <meta name="keywords" content={`${title}, energía para tu marca`} />

        <meta property="og:title" content={`energía para tu marca ${title}`} />
        <meta
          property="og:description"
          content={`energía para tu marca ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/logo.png`} />
      </Head>

      <ModalEmail />
      
      <AuthStateChange />
      <header>
        <WithSubnavigation />
      </header>
      <main>{children}</main>

      <footer w={"full"}>
        <Footer />
      </footer>
    </>
  );
};

export default ShopLayout;
