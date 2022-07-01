import React from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../../components/layout/ShopLayout";

import Breakpoints from "../../../helpers/Breakpoints";

import SaleVerify from "../../../components/sale/SaleVerify";

import Toast from "../../../helpers/Toast";

import { dbUser, dbUserByUID } from "../../../data/dbUser";

import es from "../../../translations/es";
import en from "../../../translations/en";

const Orders = ({ active }) => {
  // useRouter
  const { locale } = useRouter();
  // Breakpoints
  const { content5, bordes } = Breakpoints();

  return (
    <ShopLayout title={locale === "en" ? en.historySale.sD : es.historySale.sD}>
      <Container maxW={"container.xl"} py={10}>
        <Stack flexDirection={"column"} spacing={0}>
          <SaleVerify
            bordes={bordes}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={active?.product}
            // la referencia del pago
            referencia={active}
            // id del proceso de pago
            idThree={active.id}
            // toda la informacion del comprador, que se guardo para que se refleje en el checkout
            buy={active.buy}
            // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
            sal={active.product.uid}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Orders.propTypes = {
  active: PropTypes.object,
};

export async function getStaticPaths() {
  const sales = await dbUser("", "dbUserThree");
  return {
    paths: sales.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();
  try {
    // compra del producto path: /buys
    const active = await dbUserByUID(id, "dbuserThreeID");

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

export default Orders;
