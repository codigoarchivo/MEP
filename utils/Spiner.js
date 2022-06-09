import React from "react";

import { Flex, Spinner } from "@chakra-ui/react";

const Spiner = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      my={10}
      h={"full"}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.500"
        size="xl"
      />
    </Flex>
  );
};

export default Spiner;
