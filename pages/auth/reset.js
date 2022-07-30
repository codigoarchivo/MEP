import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import { ResetPassword } from "../../components/log/ResetPassword";

import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Reset = () => {
  // router
  const { locale } = useRouter();
  // Breakpoints
  const { calc } = Breakpoints();
  return (
    <>
      <Container maxW={"container.sm"} px={{ base: 2, md: 4 }}>
        <Flex h={calc} alignItems={["top", "center"]} justifyContent="center">
          <ResetPassword locale={locale} es={es} en={en} />
        </Flex>
      </Container>
    </>
  );
};

export default Reset;
