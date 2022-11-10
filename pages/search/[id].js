import React, { useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Container } from "@chakra-ui/react";

import { messagesList } from "../../actions/checkout";

import ShopLayout from "../../components/layout/ShopLayout";

import { SerchDetails } from "../../components/search/SerchDetails";

import { dbSerch } from "../../data/dbSerch";
import { dbMessage } from "../../data/dbMessage";

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

  const [product, msg] = await Promise.all([dbSerch(id), dbMessage(id)]);

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
      msg,
    },
    revalidate: 86400, // 60 * 60 * 24,
  };
}

const Details = ({ product = {}, msg = [] }) => {
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale, push } = useRouter();
  // useSelector
  const { message } = useSelector(({ message }) => message);

  useEffect(() => {
    if (msg) {
      dispatch(messagesList(msg));
    } else {
      dispatch(messagesList([]));
    }
  }, [dispatch, msg]);

  return (
    <ShopLayout title={locale === "en-US" ? en.details : es.details}>
      <Container
        maxW="container.lg"
        px={{ base: 2, md: 4 }}
        py={{ base: 0, md: 10 }}
      >
        <SerchDetails
          message={message}
          msg={msg}
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
  msg: PropTypes.object,
};

export default Details;
