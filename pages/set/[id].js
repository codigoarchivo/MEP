import React from "react";

import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import { ProductData } from "../../components/product/ProductData";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbProducts, dbProductsById } from "../../data/dbProducts";

import { Toast } from "../../helpers/Toast";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const ConfigDashboard = ({ product = {} }) => {
  // router
  const { push, locale, query, back } = useRouter();
  // selector
  const { listData: list = [] } = useSelector(({ category }) => category);

  if (!list[0]) {
    push("/");
  }

  return (
    <ShopLayout title={query.set}>
      <Container maxW={"container.sm"} py={10}>
        <ProductData
          product={product}
          word={query.set}
          details={query.dt}
          push={push}
          back={back}
          locale={locale}
          es={es}
          en={en}
        />
      </Container>
    </ShopLayout>
  );
};

ConfigDashboard.propTypes = {
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
  const id = await params.id.toString();
  try {
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
