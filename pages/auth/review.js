import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import ReviewUser from "../../components/log/ReviewUser";

import Breakpoints from "../../helpers/Breakpoints";

import en from "../../translations/en";
import es from "../../translations/es";

const Review = () => {
  // router
  const { locale, push } = useRouter();
  // Breakpoints
  const { calc } = Breakpoints();
  return (
    <>
      <Container maxW={"container.sm"}>
        <Flex h={calc} alignItems={["top", "center"]} justifyContent="center"  py={5}>
          <ReviewUser locale={locale} es={es} en={en} />
        </Flex>
      </Container>
    </>
  );
};

export default Review;
