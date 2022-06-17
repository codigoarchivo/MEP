import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import ResetPassword from "../../components/log/ResetPassword";

const Reset = () => {
  return (
    <>
      <Container maxW={"container.sm"}>
        <Flex alignItems={["top", "center"]} justifyContent="center">
          <ResetPassword />
        </Flex>
      </Container>
    </>
  );
};

export default Reset;
