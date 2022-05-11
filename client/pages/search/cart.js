import React from "react";

import { Container, Flex, VStack } from "@chakra-ui/react";

import { useSelector } from "react-redux";

import SerchCart from "../../components/search/SerchCart";

import Layout from "../../components/layout/layout";

import { PageNotFound } from "../../components/err/PageNotFound";

const cart = () => {
  const { activeSelectCheck } = useSelector(({ product }) => product);
  {
    return activeSelectCheck.length > 0 ? (
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
      <Layout>
        <Container maxW="container.lg">
          <VStack width={"full"}>
            <SerchCart />
          </VStack>
        </Container>
      </Layout>
    );
  }
};

export default cart;
