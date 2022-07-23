import React from "react";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import { Container } from "@chakra-ui/react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Toast } from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import { UserScreen } from "../../components/user/UserScreen";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Informacion = ({ user = {} }) => {
  const { locale, back, push } = useRouter();

  return (
    <ShopLayout title={locale === "en" ? en.personal : es.personal}>
      <Container maxW="lg">
        <UserScreen
          user={{ ...user }}
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

export async function getStaticPaths() {
  const { docs } = await getDocs(collection(db, "users"));

  const user = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    paths: user.map(
      ({ id }) => (
        {
          params: {
            uid: id,
          },
          locale: "en",
        },
        {
          params: {
            uid: id,
          },
          locale: "es",
        }
      )
    ),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const uid = await params.uid.toString();
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

export default Informacion;
