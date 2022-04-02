import React from "react";

import { withRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import SerchCart from "../../components/search/SerchCart";

import Layout from "../../components/layout/layout";

const Cart = () => {
  return (
    <Layout>
      <Container maxW="container.lg">
        <Flex width={"full"}>
          <SerchCart />
        </Flex>
      </Container>
    </Layout>
  );
};

export default withRouter(Cart);
