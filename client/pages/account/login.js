import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import LoginUser from "../../components/log/loginUser";

const login = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex alignItems={["top", "center"]} justifyContent="center">
        <LoginUser />
      </Flex>
    </Container>
  );
};

export default login;
