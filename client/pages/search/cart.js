import React from "react";

import { Container, VStack } from "@chakra-ui/react";

import SerchCart from "../../components/search/SerchCart";

import Layout from "../../components/layout/layout";

const Cart = () => {
  return (
    <Layout>
      <Container maxW="container.lg">
        <VStack width={"full"}>
          <SerchCart />
        </VStack>
      </Container>
    </Layout>
  );
};

export default Cart;
