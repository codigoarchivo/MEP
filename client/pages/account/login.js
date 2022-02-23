import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import LoginUser from "../../components/log/loginUser";

import Breakpoints from "../../helpers/Breakpoints";

const login = () => {
  // Breakpoints
  const { auto1 } = Breakpoints();
  return (
    <Container maxW="container.xl" p={0}>
      <Flex h={auto1} alignItems={["top", "center"]} justifyContent="center">
        <LoginUser />
      </Flex>
    </Container>
  );
};

export default login;
