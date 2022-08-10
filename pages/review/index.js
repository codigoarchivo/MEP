import React, { useMemo } from "react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase/config";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { ReviewScreen } from "../../components/review/ReviewScreen";

import { Toast } from "../../helpers/Toast";

import { useSelector } from "react-redux";

import { es } from "../../translations/es";
import { en } from "../../translations/en";

export async function getServerSideProps(context) {
  // id message
  const g = context.query.g.toString();
  // id del producto
  const p = context.query.p.toString();

  try {
    const docSnap = await getDoc(doc(db, "serchs", p, "messages", g));

    const msg = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return { props: { msg } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
}

const Review = ({ msg }) => {
  // useRouter
  const { locale, push, back, query } = useRouter();
  // useSelector
  const { cant } = useSelector(({ message }) => message);

  // id message
  const g = query.g.toString();
  // id del producto
  const p = query.p.toString();
  // message
  const i = query.i.toString();

  return (
    <ShopLayout title={locale === "en-US" ? en.review.rC : es.review.rC}>
      <Container maxW={"container.sm"} px={{ base: 2, md: 4 }}>
        <ReviewScreen
          calculo={cant}
          message={msg}
          p={p}
          i={i}
          g={g}
          locale={locale}
          push={push}
          back={back}
          es={es}
          en={en}
        />
      </Container>
    </ShopLayout>
  );
};

Review.propTypes = {
  msg: PropTypes.object,
};

export default Review;
