import React from "react";

import { Container, Spinner } from "@chakra-ui/react";

import ShopLayout from "../components/layout/ShopLayout";

const Spiner = ({ title }) => {
  return (
    <ShopLayout title={title}>
      <Container maxW={"container.sm"} textAlign="center" py={40}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.300"
          color="brand.500"
          size="xl"
        />
      </Container>
    </ShopLayout>
  );
};

export default Spiner;
