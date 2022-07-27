import React from "react";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import { SerchCart } from "../../components/search/SerchCart";

import { useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Cart = () => {
  // selector
  const { activeCartSelect = [] } = useSelector(({ cart }) => cart);
  // selector
  const { saveCartSelect = [] } = useSelector(({ save }) => save);
  // saveCartSelect: guarda a la lista de deseo del path cart/
  // activeCartSelect: guarda a la lista cart del path cart/

  const { locale } = useRouter();
  return (
    <ShopLayout title={locale === "en" ? en.cart.cA : es.cart.cA}>
      <Container maxW="container.xl" py={{ base: 0, lg: 10 }}>
        <SerchCart active={activeCartSelect} save={saveCartSelect} />
      </Container>
    </ShopLayout>
  );
};

export default Cart;
