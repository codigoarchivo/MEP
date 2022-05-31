import React from "react";

import { Container, Flex, VStack } from "@chakra-ui/react";

import { useSelector } from "react-redux";

import SerchCart from "../../components/search/SerchCart";

import ShopLayout from "../../components/layout/ShopLayout";

import { PageNotFound } from "../../components/err/PageNotFound";

const Cart = () => {
  const { activeSelectCheck: check = [] } = useSelector(
    ({ product }) => product
  );
  {
    return check.length > 0 ? (
      <Container maxW="container.xl" p={0}>
        <Flex
          h={"100vh"}
          alignItems={["top", "center"]}
          justifyContent="center"
        >
          <PageNotFound />
        </Flex>
      </Container>
    ) : (
      <ShopLayout>
        <Container maxW="container.xl">
          <VStack width={"full"}>
            <SerchCart />
          </VStack>
        </Container>
      </ShopLayout>
    );
  }
};

export default Cart;
