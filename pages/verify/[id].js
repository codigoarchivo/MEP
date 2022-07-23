import React from "react";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { Container, Stack } from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";

import { CheckVerify } from "../../components/checkout/CheckVerify";

import { Toast } from "../../helpers/Toast";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Verification = ({ data }) => {
  // router
  const { push, locale, back } = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();

  return (
    <ShopLayout title={locale === "en" ? en.verify.vG : es.verify.vG}>
      <Container maxW={"container.xl"} py={{ base: 0, md: 10 }}>
        <Stack flexDirection={"column"} spacing={10}>
          <CheckVerify
            // boides
            bordes={bordes}
            // idThree es id del la compra del data
            idThree={data.id}
            // toda la informacion del data, que se guardo en el uid del comprador
            product={data.product}
            locale={locale}
            push={push}
            back={back}
            en={en}
            es={es}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Verification.propTypes = {
  data: PropTypes.object.isRequired,
};

export async function getStaticPaths() {
  const { docs } = await getDocs(collection(db, "buys"));

  const product = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    paths: product.map(
      ({ id }) => (
        {
          params: {
            id,
          },
          locale: "en",
        },
        {
          params: {
            id,
          },
          locale: "es",
        }
      )
    ),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();

  try {
    const docSnap = await getDoc(doc(db, "buys", id));

    const data = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    if (!data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Verification;
