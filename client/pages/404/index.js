import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import { PageNotFound } from "../../components/err/PageNotFound";

import Breakpoints from "../../helpers/Breakpoints";

const Custom404 = () => {
  // Breakpoints
  const { auto1 } = Breakpoints();
  return (
    <>
      <Container maxW="container.xl" p={0}>
        <Flex
          h={auto1}
          alignItems={["top", "center"]}
          justifyContent="center"
        >
          <PageNotFound />
        </Flex>
      </Container>
    </>
  );
};

export default Custom404;
