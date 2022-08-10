import React from "react";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../../components/layout/ShopLayout";

import { Breakpoints } from "../../../helpers/Breakpoints";

import { SaleVerifyAll } from "../../../components/admin/SaleVerifyAll";

import { Toast } from "../../../helpers/Toast";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export async function getStaticPaths() {
  const { docs } = await getDocs(collection(db, "sales"));

  const sales = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    paths: sales.map(
      ({ id }) => (
        {
          params: {
            id,
          },
          locale: "en-US",
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
    const docSnap = await getDoc(doc(db, "sales", id));

    const active = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    if (!active) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        active,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

const Orders = ({ active }) => {
  // dispatch
  const { push, locale, back } = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();

  return (
    <ShopLayout
      title={locale === "en-US" ? en.historySale.sD : es.historySale.sD}
    >
      <Container
        maxW={"container.xl"}
        px={{ base: 2, md: 4 }}
        py={{ base: 0, md: 10 }}
      >
        <Stack flexDirection={"column"} spacing={0}>
          <SaleVerifyAll
            bordes={bordes}
            // toda la informacion del producto
            product={active.product}
            // toda la imformación en general
            referencia={active}
            // id del proceso
            idThree={active.id}
            // uid del comprador
            buy={active.buy}
            // uid que esta producto se utiliza para comparar con el uid owner
            sal={active.product.uid}
            push={push}
            locale={locale}
            back={back}
            es={es}
            en={en}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Orders.propTypes = {
  active: PropTypes.object,
};

export default Orders;
