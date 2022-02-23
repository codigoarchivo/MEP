import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import CreateUser from "../../components/log/CreateUser";

import Breakpoints from "../../helpers/Breakpoints";

const create = () => {
  // Breakpoints
  const { auto1 } = Breakpoints();
  return (
    <Container maxW="container.xl" p={0}>
      <Flex h={auto1} alignItems={["top", "center"]} justifyContent="center">
        <CreateUser />
      </Flex>
    </Container>
  );
};

export default create;
