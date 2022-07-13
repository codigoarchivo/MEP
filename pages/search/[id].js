import React, { useEffect } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Container } from "@chakra-ui/react";

import Toast from "../../helpers/Toast";

import { messagesList } from "../../actions/checkout";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbProducts, dbProductsById } from "../../data/dbProducts";

import SerchDetails from "../../components/search/SerchDetails";

import en from "../../translations/en";
import es from "../../translations/es";

const Details = ({ product = {} }) => {
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const { query, locale, push } = useRouter();
  // useSelector
  const { message: m } = useSelector(({ checkout }) => checkout);

  useEffect(() => {
    async function fetchData() {
      const message = await dbProducts(query.id, "dbProThree");
      if (message) {
        dispatch(messagesList(message));
      } else {
        dispatch(messagesList([]));
      }
    }
    fetchData();
  }, [dispatch, query.id]);

  return (
    <ShopLayout title={locale === "en" ? en.details : es.details}>
      <Container maxW="container.lg" py={{ base: 0, md: 10 }}>
        <SerchDetails
          message={m}
          product={product}
          push={push}
          locale={locale}
          es={es}
          en={en}
        />
      </Container>
    </ShopLayout>
  );
};

Details.propType = {
  product: PropTypes.object,
};

export async function getStaticPaths() {
  const producto = await dbProducts("", "dbProFour");
  return {
    paths: producto.map(
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
  try {
    // message
    const id = params.id;
    // product
    const product = await dbProductsById(id, "dbProOneID");

    if (!product) {
      return {
        // notFound: true, // Devolverá la página 404
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return { props: { product } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: { message: [], product: {} } };
  }
}

export default Details;
