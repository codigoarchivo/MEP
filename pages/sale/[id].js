import React from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import { dbUser, dbUserByUID } from "../../data/dbUser";

import SaleVerify from "../../components/sale/SaleVerify";

import es from "../../translations/es";
import en from "../../translations/en";

const Sales = ({ sale }) => {
  // dispatch
  const { push, locale, back } = useRouter();
  // Breakpoints
  const { content5, bordes } = Breakpoints();

  return (
    <ShopLayout title={"sales"}>
      <Container maxW={"container.xl"} py={10}>
        <Stack flexDirection={"column"} spacing={0}>
          <SaleVerify
            bordes={bordes}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={sale.product}
            // la referencia del pago
            referencia={sale}
            // id del proceso de pago
            idThree={sale.id}
            // toda la informacion del comprador, que se guardo para que se refleje en el checkout
            buy={sale.buy}
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

Sales.propTypes = {
  sale: PropTypes.object,
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
    const sale = await dbUserByUID(id, "dbuserThreeID");

    if (!sale) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        sale,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Sales;
