import React, { useMemo } from "react";

import { Container } from "@chakra-ui/react";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import ReviewScreen from "../../components/review/ReviewScreen";

import { dbProducts } from "../../data/dbProducts";

import Toast from "../../helpers/Toast";

const Review = ({ message = [], p = "", i = "", g = "" }) => {
  // guardamos solamente el mensaje que necesitamos editar
  const match = message.find((i) => String(i.id) === g);
  match.rat = [match.rat];

  // creamos  una nueva instancia con todos los valores rat menos el que vamos a modificar
  let el = [];
  message.map((i) => {
    if (String(i.id) !== g) {
      return el.push(i.rat);
    }
  });
  
  return (
    <ShopLayout title={"Review"}>
      <Container maxW={"container.sm"}>
        <ReviewScreen calculo={el} message={match} p={p} i={i} g={g} />
      </Container>
    </ShopLayout>
  );
};

Review.propTypes = {
  message: PropTypes.array,
  p: PropTypes.string,
  i: PropTypes.string,
  g: PropTypes.string,
};

export async function getServerSideProps({ query }) {
  // id three
  const g = query.g.toString();
  // id del producto que esta dentro id three
  const p = query.p.toString();
  // id del mensaje o es new
  const i = query.i.toString();
  try {
    // message
    const message = i !== "new" ? await dbProducts(p, "dbProThree") : [];

    return { props: { message, p, i, g } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: { message: [] } };
  }
}

export default Review;
