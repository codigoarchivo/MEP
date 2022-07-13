import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";

import PropTypes from "prop-types";

import { CheckIcon } from "@chakra-ui/icons";

const BlogCategory = (item) => {
  return (
    <HStack align={"top"}>
      <Box color={"brand.500"} px={2}>
        <Icon as={CheckIcon} />
      </Box>
      <VStack align={"start"}>
        <Text fontWeight={600}>{item.title}</Text>
        <Text color={"gray.600"}>{item.text}</Text>
      </VStack>
    </HStack>
  );
};

BlogCategory.propTypes = {
  item: PropTypes.object,
};

export default BlogCategory;
