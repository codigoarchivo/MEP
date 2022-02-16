import React from "react";

import { withRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import SerchCart from "../../components/search/SerchCart";

const Cart = (e) => {
  console.log(e);
  return (
    <Container maxW="container.lg">
      <Flex width={"full"}>
        <CartScreen />
      </Flex>
    </Container>
  );
};

export default withRouter(Cart);
