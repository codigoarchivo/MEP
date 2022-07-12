import React from "react";

import { Container, Spinner } from "@chakra-ui/react";

import Breakpoints from "../helpers/Breakpoints";

const Spiner = () => {
  const { calc } = Breakpoints();
  return (
    <Container h={calc} maxW={"container.sm"} textAlign="center" py={40}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.300"
        color="brand.500"
        size="xl"
      />
    </Container>
  );
};

export default Spiner;
