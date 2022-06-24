import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

const BlogCategory = (item) => {
  return (
    <HStack key={item.title} align={"top"}>
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

export default BlogCategory;
