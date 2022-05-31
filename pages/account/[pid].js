import React from "react";

import { Container, Flex } from "@chakra-ui/react";

import ReviewUser from "../../components/log/ReviewUser";

const Review = () => {
  return (
    <>
      <Container maxW={"container.sm"}>
        <Flex alignItems={["top", "center"]} justifyContent="center">
          <ReviewUser />
        </Flex>
      </Container>
    </>
  );
};

export default Review;
