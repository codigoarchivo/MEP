import React from "react";

import { withRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import SerchCart from "../../components/search/SerchCart";
import Layout from "../../components/layout/layout";

const Cart = (e) => {
  console.log(e);
  return (
    <Layout>
      <Container maxW="container.lg">
        <Flex width={"full"}>
          <CartScreen />
        </Flex>
      </Container>
    </Layout>
  );
};

export default withRouter(Cart);
