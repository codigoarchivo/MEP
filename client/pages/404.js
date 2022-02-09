import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import { PageNotFound } from "../components/err/PageNotFound";

const Custom404 = () => {
  return (
    <>
      <Container maxW="container.xl" p={0}>
        <Flex
          h={["auto", "auto", "100vh"]}
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
