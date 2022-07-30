import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import { CreateUser } from "../../components/log/CreateUser";

import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Create = () => {
  // router
  const { locale, back, push } = useRouter();
  // Breakpoints
  const { calc } = Breakpoints();

  return (
    <Container maxW={"container.sm"} px={{ base: 2, md: 4 }}>
      <Flex
        h={calc}
        alignItems={["top", "center"]}
        justifyContent="center"
        py={5}
      >
        <CreateUser push={push} locale={locale} es={es} en={en} back={back} />
      </Flex>
    </Container>
  );
};

export default Create;
