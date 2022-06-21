import React from "react";

import { Container } from "@chakra-ui/react";

import SerchCart from "../../components/search/SerchCart";

import { useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

const Cart = () => {
  // selector
  const { activeCartSelect = [], saveCartSelect = [] } = useSelector(
    ({ process }) => process
  );

  return (
    <ShopLayout title={"Cart"}>
      <Container maxW="container.xl">
        <SerchCart active={activeCartSelect} save={saveCartSelect} />
      </Container>
    </ShopLayout>
  );
};

export default Cart;
