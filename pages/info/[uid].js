import React from "react";

import { Container } from "@chakra-ui/react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { UserScreen } from "../../components/user/UserScreen";

import { userById } from "../../data/dbUser";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(context) {
  
  const uid = await context.query.uid.toString();

  const user = await userById(uid);

  if (!user) {
    return {
      redirect: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
}

const Informacion = ({ user = {} }) => {
  const { locale, back, push } = useRouter();

  return (
    <ShopLayout title={locale === "en-US" ? en.user.uF : es.user.uF}>
      <Container maxW="lg" px={{ base: 2, md: 4 }}>
        <UserScreen
          user={user}
          locale={locale}
          back={back}
          push={push}
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

export default Informacion;
