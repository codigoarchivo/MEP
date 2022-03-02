import React from "react";

import { Container, VStack } from "@chakra-ui/react";

import RetrieveUser from "../../components/log/RetrieveUser";

import Breakpoints from "../../helpers/Breakpoints";

const Recuperar = () => {
  // breakpoints
  const { points21, points22 } = Breakpoints();
  return (
    <>
      <Container maxW={"container.sm"}>
        <VStack p={points21} mt={points22}>
          <RetrieveUser />
        </VStack>
      </Container>
    </>
  );
};

export default Recuperar;
