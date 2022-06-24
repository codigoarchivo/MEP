import React, { useMemo } from "react";

import { Container } from "@chakra-ui/react";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import ReviewScreen from "../../components/review/ReviewScreen";

import Toast from "../../helpers/Toast";

import { useSelector } from "react-redux";

const Review = ({ p = "", i = "", g = "" }) => {
  // useSelector
  const { message } = useSelector(({ checkout }) => checkout);

  // guardamos solamente el mensaje que necesitamos editar

  const match = useMemo(() => message.find((i) => String(i.id) === g), [
    message,
  ]);

  // creamos  una nueva instancia con todos los valores rat menos el que vamos a modificar
  let el = [];

  useMemo(
    () =>
      message.map((i) => {
        if (String(i.id) !== g) {
          return el.push(i.rat);
        }
      }),
    [message]
  );
  // console.log(el);
  return (
    <ShopLayout title={"Review"}>
      <Container maxW={"container.sm"}>
        <ReviewScreen calculo={el} message={match} p={p} i={i} g={g} />
      </Container>
    </ShopLayout>
  );
};

Review.propTypes = {
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
    return { props: { p, i, g } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
}

export default Review;
