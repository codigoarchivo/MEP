import React from "react";

import { Container } from "@chakra-ui/react";

import SerchCart from "../../components/search/SerchCart";

import ShopLayout from "../../components/layout/ShopLayout";

const Cart = () => {
  return (
    <ShopLayout title={"Cart"}>
      <Container maxW="container.xl">
        <SerchCart />
      </Container>
    </ShopLayout>
  );
};

export default Cart;
