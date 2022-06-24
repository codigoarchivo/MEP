import React from "react";

import { Box, Heading, HStack, Progress } from "@chakra-ui/react";

import { Rating } from "react-simple-star-rating";

const SerchRat = (item) => {
  return (
    <HStack p={0.5}>
      <Box p={0.5}>
        <Heading w={6} size={"sm"}>
          {item.nam}
        </Heading>
      </Box>
      <Progress w={"full"} colorScheme="yellow" size="sm" value={item.est} />
      <Box p={0.5}>{item.per}</Box>
      <Rating size={25} ratingValue={item.est || 0} readonly={true} />
      <Box p={0.5}>
        <Heading size={"xs"}>{item.rat.toFixed(0)}%</Heading>
      </Box>
    </HStack>
  );
};

export default SerchRat;
