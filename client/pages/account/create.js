import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import CreateUser from "../../components/log/CreateUser";

import useAuth from "../../hooks/useAuth";

const Create = () => {
  // useAuth
  const { isloggedIn } = useAuth();
  // router
  const router = useRouter();

  if (isloggedIn) {
    router.push("/");
  }

  return (
    <Container maxW={"container.sm"}>
      <Flex alignItems={["top", "center"]} justifyContent="center">
        <CreateUser />
      </Flex>
    </Container>
  );
};

export default Create;
