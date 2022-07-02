import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import CreateUser from "../../components/log/CreateUser";

import Breakpoints from "../../helpers/Breakpoints";

import es from "../../translations/es";
import en from "../../translations/en";

const Create = () => {
  // router
  const { locale } = useRouter();
  // Breakpoints
  const { calc } = Breakpoints();

  return (
    <Container maxW={"container.sm"}>
      <Flex h={calc} alignItems={["top", "center"]} justifyContent="center">
        <CreateUser locale={locale} es={es} en={en} />
      </Flex>
    </Container>
  );
};

export default Create;
