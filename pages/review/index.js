import React, { useMemo } from "react";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { ReviewScreen } from "../../components/review/ReviewScreen";

import { Toast } from "../../helpers/Toast";

import { useSelector } from "react-redux";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps({ query }) {
  // id three
  const g = query.g.toString();
  // id del producto que esta dentro id three
  const p = query.p.toString();
  // id del mensaje o es new
  const i = query.i.toString();
  try {
    return { props: { p, i, g } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
}

const Review = ({ p = "", i = "", g = "" }) => {
  // useRouter
  const { locale, push, back } = useRouter();
  // useSelector
  const { message } = useSelector(({ message }) => message);

  // guardamos solamente el mensaje que necesitamos editar

  const match = useMemo(() => message.find((i) => String(i.id) === g), [
    message,
    g,
  ]);

  // creamos  una nueva instancia con todos los valores rat menos el que vamos a modificar
  let el = [];
  message.map((i) => {
    if (String(i.id) !== g) {
      el.push(i.rat);
    }
  });

  return (
    <ShopLayout title={locale === "en" ? en.review.rC : es.review.rC}>
      <Container maxW={"container.sm"}>
        <ReviewScreen
          calculo={el}
          message={match}
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
  p: PropTypes.string,
  i: PropTypes.string,
  g: PropTypes.string,
};

export default Review;
