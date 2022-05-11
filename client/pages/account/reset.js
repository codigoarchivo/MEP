import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import ResetPassword from "../../components/log/ResetPassword";

const reset = () => {
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

export default reset;
