import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import CreateUser from "../../components/log/CreateUser";

import { useSelector } from "react-redux";

const create = () => {
  // selector
  const {
    activeSelect: { isloggedIn },
  } = useSelector(({ auth }) => auth);
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

export default create;
