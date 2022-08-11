import React, { useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import { ProductData } from "../../components/product/ProductData";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbSerch } from "../../data/dbSerch";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getStaticPaths({ locales }) {
  const { docs } = await getDocs(collection(db, "serchs"));

  const product = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const paths = [];

  for (const locale of locales) {
    product.map((item) => {
      paths.push({ params: { id: item.id }, locale });
    });
  }

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();

  const product = await dbSerch(id);

  if (!product) {
    return {
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
    revalidate: 86400, // 60 * 60 * 24,
  };
}

const ConfigDashboard = ({ product = {} }) => {
  // router
  const { push, locale, query, back } = useRouter();
  // selector
  const { listData: list = [] } = useSelector(({ listca }) => listca);

  useEffect(() => {
    if (!list[0]) {
      push("/");
    }
  });

  return (
    <ShopLayout title={query.set}>
      <Container
        maxW={"container.sm"}
        px={{ base: 2, md: 4 }}
        py={{ base: 0, md: 10 }}
      >
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

export default ConfigDashboard;
