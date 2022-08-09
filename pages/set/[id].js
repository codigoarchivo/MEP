import React, { useEffect } from "react";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import { ProductData } from "../../components/product/ProductData";

import ShopLayout from "../../components/layout/ShopLayout";

import { Toast } from "../../helpers/Toast";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getStaticPaths() {
  const { docs } = await getDocs(collection(db, "serchs"));

  const producto = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

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
    const docSnap = await getDoc(doc(db, "serchs", id));

    const product = {
      id: docSnap.id,
      ...docSnap.data(),
    };

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
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
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
