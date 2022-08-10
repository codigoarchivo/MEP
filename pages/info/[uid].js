import React from "react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase/config";

import { Container } from "@chakra-ui/react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Toast } from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import { UserScreen } from "../../components/user/UserScreen";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps({ query }) {
  const uid = await query.uid.toString();
  try {
    const docSnap = await getDoc(doc(db, "users", uid));

    const user = {
      id: docSnap.id,
      ...docSnap.data(),
    };

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
