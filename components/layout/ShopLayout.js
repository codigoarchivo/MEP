import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import Head from "next/head";

import { auth } from "../../firebase/config";

import { onAuthStateChanged } from "firebase/auth";

import { login } from "../../actions/auth";

import { WithSubnavigation } from "./nav/WithSubnavigation";

import { Footer } from "./foo/Footer";

const dA = process.env.NEXT_PUBLIC_ROL_A;

const ShopLayout = ({ children, title }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!!user?.uid) {
        dispatch(
          login(
            user.uid,
            user.displayName,
            user.photoURL,
            user.email,
            user.uid === dA.toString() ? "owner" : "user"
          )
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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

      <main>{children}</main>

      <footer w={"full"}>
        <Footer />
      </footer>
    </>
  );
};

export default ShopLayout;
