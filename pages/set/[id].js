import React from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import ProductData from "../../components/product/ProductData";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbProducts, dbProductsById } from "../../data/dbProducts";

import Toast from "../../helpers/Toast";

import es from "../../translations/es";
import en from "../../translations/en";

const ConfigDashboard = ({ product = {} }) => {
  // router
  const { push, locale, query } = useRouter();
  return (
    <ShopLayout title={query.set}>
      <Container maxW={"container.sm"} py={10}>
        <ProductData
          product={product}
          set={query.set}
          details={query.dt}
          push={push}
          locale={locale}
          es={es}
          en={en}
        />
      </Container>
    </ShopLayout>
  );
};

export async function getStaticPaths() {
  const producto = await dbProducts("", "dbProFour");
  return {
    paths: producto.map(({ id }) => ({
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
    const product = await dbProductsById(id, "dbProOneID");

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

ConfigDashboard.propTypes = {
  product: PropTypes.object,
};

export default ConfigDashboard;
