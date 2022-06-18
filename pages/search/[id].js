import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Container } from "@chakra-ui/react";

import Toast from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbProducts, dbProductsById } from "../../data/dbProducts";

import SerchDetails from "../../components/search/SerchDetails";

import { productDetails } from "../../actions/product";

const Details = ({ message = [], product = {} }) => {
  // selector
  const { active } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (message || product) {
      dispatch(productDetails({ message, product }));
    }
  }, [dispatch, message, product]);

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
    const product = await dbProductsById(id);

    const message = await dbProducts(id, "dbProThree");

    return { props: { message, product } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: { message: [], product: {} } };
  }
}

export default Details;
