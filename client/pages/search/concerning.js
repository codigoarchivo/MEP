import React from "react";

import ShopLayout from "../../components/layout/ShopLayout";

import { Container, Heading } from "@chakra-ui/react";


const concerning = () => {
  return (
    <ShopLayout>
      <Container maxW={"container.xs"}>
          <Heading>concerning</Heading>
      </Container>
    </ShopLayout>
  );
};

export default concerning;
