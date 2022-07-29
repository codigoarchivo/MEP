import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";

import PropTypes from "prop-types";

import { CheckIcon } from "@chakra-ui/icons";

export const BlogCategory = (item) => {
  return (
    <HStack align={"top"}>
      <Box px={1}>
        <Icon as={CheckIcon} />
      </Box>
      <VStack align={"start"}>
        <Text fontWeight={600}>{item.title}</Text>
        <Text>{item.text}</Text>
      </VStack>
    </HStack>
  );
};

BlogCategory.propTypes = {
  item: PropTypes.object,
};
