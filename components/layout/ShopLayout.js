import React from "react";

// import { useDispatch, useSelector } from "react-redux";

import { AuthStateChange } from "../../helpers/AuthStateChange";

import Head from "next/head";

import { WithSubnavigation } from "./nav/WithSubnavigation";

import { Footer } from "./foo/Footer";

// import { logout } from "../../actions/auth";

// import { Toast } from "../../helpers/Toast";

const ShopLayout = ({ children, title }) => {
  // // useSelector
  // const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // // dispatch
  // const dispatch = useDispatch();

  // const err = locale === "en" ? en.error : es.error;

  // useEffect(() => {
  //   if (a?.emailVerified === false) {

  //     Toast("Tienes 60 segundos para revisar tu correo", "info", 5000)

  //     setTimeout(() => dispatch(logout(err)), 1000 * 60);
  //   }
  // });

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
