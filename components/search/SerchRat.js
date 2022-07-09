import React from "react";

import PropTypes from "prop-types";

import { Box, Heading, HStack, Icon, Progress, Text } from "@chakra-ui/react";

import { Rating } from "react-simple-star-rating";

import Breakpoints from "../../helpers/Breakpoints";

import { BsPerson } from "../../helpers/IconNew";

const SerchRat = (item) => {
  // Breakpoints
  const { displayOff1 } = Breakpoints();
  return (
    <HStack
      p={0.5}
      justifyContent={"space-evenly"}
      spacing={{ base: 2, sm: 5 }}
      overflowX={"hidden"}
    >
      <Box p={0.5}>
        <Heading w={6} size={"sm"}>
          {item.nam}
        </Heading>
      </Box>
      <Progress
        w={"full"}
        display={displayOff1}
        colorScheme="yellow"
        size="sm"
        value={item.est}
      />
      <HStack p={0.5} spacing={1}>
        <Icon as={BsPerson} />
        <Text>{item.per}</Text>
      </HStack>
      <Box display={displayOff1}>
        <Rating size={20} ratingValue={item.est || 0} readonly={true} />
      </Box>
      <Box p={0.5}>
        <Heading size={"xs"}>{item.rat.toFixed(0)}%</Heading>
      </Box>
    </HStack>
  );
};

SerchRat.propTypes = {
  item: PropTypes.object,
};

export default SerchRat;
