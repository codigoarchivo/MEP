import React, { useEffect } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Container } from "@chakra-ui/react";

import { Toast } from "../../helpers/Toast";

import { messagesList } from "../../actions/checkout";

import ShopLayout from "../../components/layout/ShopLayout";

import { SerchDetails } from "../../components/search/SerchDetails";

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
  // message
  const id = params.id.toString();
  try {
    const docSnap = await getDoc(doc(db, "serchs", id));

    const product = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    const q = query(
      collection(db, "serchs", id, "messages"),
      orderBy("cre", "desc")
    );

    const { docs } = await getDocs(q);

    const msg = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!product) {
      return {
        // notFound: true, // Devolverá la página 404
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return { props: { product, msg } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: { message: [], product: {} } };
  }
}

const Details = ({ product = {}, msg = [] }) => {
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale, push } = useRouter();
  // useSelector
  const { message: m } = useSelector(({ message }) => message);

  useEffect(() => {
    if (!!msg[0]) {
      dispatch(messagesList(msg));
    } else {
      dispatch(messagesList([]));
    }
  }, [dispatch, msg]);

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
  msg: PropTypes.object,
};

export default Details;
