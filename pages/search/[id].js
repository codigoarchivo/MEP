import React from "react";

import PropTypes from "prop-types";

import { Container } from "@chakra-ui/react";

import Toast from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbProducts, dbProductsById } from "../../data/dbProducts";

import SerchDetails from "../../components/search/SerchDetails";

const Details = ({ message = [], product = {} }) => {
  const active = { message, product };

  return (
    <ShopLayout title={"Details"}>
      <Container maxW="container.lg" py={10}>
        <SerchDetails {...active} />
      </Container>
    </ShopLayout>
  );
};

Details.propType = {
  message: PropTypes.array,
  product: PropTypes.object,
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
  try {
    // message
    const id = params.id;
    // product
    const product = await dbProductsById(id, "dbProOneID");

    const message = await dbProducts(id, "dbProThree");

    return { props: { message, product } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: { message: [], product: {} } };
  }
}

export default Details;
