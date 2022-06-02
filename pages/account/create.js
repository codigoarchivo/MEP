import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import CreateUser from "../../components/log/CreateUser";

const Create = () => {
  return (
    <Container maxW={"container.sm"}>
      <Flex alignItems={["top", "center"]} justifyContent="center">
        <CreateUser />
      </Flex>
    </Container>
  );
};

export default Create;
