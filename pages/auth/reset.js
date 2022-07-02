import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import ResetPassword from "../../components/log/ResetPassword";

import Breakpoints from "../../helpers/Breakpoints";

import es from "../../translations/es";
import en from "../../translations/en";

const Reset = () => {
  // router
  const { locale } = useRouter();
  // Breakpoints
  const { calc } = Breakpoints();
  return (
    <>
      <Container maxW={"container.sm"}>
        <Flex h={calc} alignItems={["top", "center"]} justifyContent="center">
          <ResetPassword locale={locale} es={es} en={en}  />
        </Flex>
      </Container>
    </>
  );
};

export default Reset;
