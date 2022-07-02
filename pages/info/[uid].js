import React from "react";

import { Container } from "@chakra-ui/react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import Toast from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbUser, dbUserByUID } from "../../data/dbUser";

import UserScreen from "../../components/user/UserScreen";

import es from "../../translations/es";
import en from "../../translations/en";

const Informacion = ({ user = {} }) => {
  
  const { locale, back } = useRouter();

  return (
    <ShopLayout title={locale === "en" ? en.personal : es.personal}>
      <Container maxW="lg">
        <UserScreen
          user={{ ...user }}
          locale={locale}
          back={back}
          es={es}
          en={en}
        />
      </Container>
    </ShopLayout>
  );
};

Informacion.propTypes = {
  user: PropTypes.object,
};

export async function getStaticPaths() {
  const user = await dbUser("", "dbUserTwo");
  return {
    paths: user.map(({ id }) => ({
      params: {
        uid: id.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const uid = await params.uid.toString();
  try {
    const user = await dbUserByUID(uid, "dbUserOneID");

    if (!user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
}

export default Informacion;
