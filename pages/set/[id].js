import React from "react";

import { Container } from "@chakra-ui/react";

import ProductData from "../../components/product/ProductData";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbProducts, dbProductsById } from "../../data/dbProducts";
import Toast from "../../helpers/Toast";

const ConfigDashboard = ({ product }) => {
  return (
    <ShopLayout>
      <Container maxW={"container.sm"}>
        <ProductData product={product} />
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
    const product = id !== "1" ? await dbProductsById(id) : {};

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

export default ConfigDashboard;
