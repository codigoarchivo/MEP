import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import Head from "next/head";

import { auth } from "../../firebase/config";

import { onAuthStateChanged } from "firebase/auth";

import { login } from "../../actions/auth";

import { chakra } from "@chakra-ui/react";

import Footer from "./foo/Footer";

import WithSubnavigation from "./nav/WithSubnavigation";

const dA = process.env.NEXT_PUBLIC_ROL_A;
const ShopLayout = ({ children, title }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
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
  }, []);

  return (
    <>
      <Head>
        <title>{title || "Market | Edgars Pendulum"}</title>
      </Head>

      {/* <AuthChange /> */}
      <chakra.header>
        <WithSubnavigation />
      </chakra.header>

      <chakra.main>{children}</chakra.main>

      <chakra.footer w={"full"}>
        <Footer />
      </chakra.footer>
    </>
  );
};

export default ShopLayout;
