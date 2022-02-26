import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import CreateUser from "../../components/log/CreateUser";

const create = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex alignItems={["top", "center"]} justifyContent="center">
        <CreateUser />
      </Flex>
    </Container>
  );
};

export default create;
