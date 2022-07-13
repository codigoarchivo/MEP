import Proptypes from "prop-types";

import { Flex, Box, Divider, useColorModeValue, Text } from "@chakra-ui/react";

const DividerWithText = (props) => {
  const { children, ...flexProps } = props;
  return (
    <Flex w={"full"} align="center" color="gray.300" {...flexProps}>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
      <Text
        as="span"
        px="3"
        color={useColorModeValue("gray.600", "gray.400")}
        fontWeight="medium"
      >
        {children}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  );
};

DividerWithText.propTypes = {
  props: Proptypes.object,
};

export default DividerWithText;
