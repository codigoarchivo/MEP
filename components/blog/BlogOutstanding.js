import { Box, Heading, Stack, Text } from "@chakra-ui/react";

import PropTypes from "prop-types";

import { Breakpoints } from "../../helpers/Breakpoints";

import { ModeColor } from "../../helpers/ModeColor";

import { NavLink } from "../../utils/Navlink";

export const BlogOutstanding = (item) => {
  const { modelE, modelF } = ModeColor();

  const { bordes } = Breakpoints();
  return (
    <Box
      maxW={{ base: "240px", sm: "470px", lg: "240px" }}
      w={"full"}
      boxShadow={"dark-lg"}
      rounded={"lg"}
      overflow={"hidden"}
      border={bordes}
      bg={"brand.900"}
      color={"brand.500"}
    >
      <Stack
        w={"full"}
        textAlign={"center"}
        p={{ base: 3, md: 6 }}
        align={"center"}
        spacing={10}
      >
        <Text
          bg={"brand.500"}
          color={"brand.900"}
          fontSize={"sm"}
          fontWeight={500}
          w={"full"}
          p={2}
          px={3}
          rounded={"full"}
        >
          {item.title}
        </Text>
        <Heading size={"md"}>{item.name}</Heading>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text fontSize={"6xl"} fontWeight={100}>
            {item.price}
          </Text>
        </Stack>
        <Box>
          <NavLink
            backgroundColor={"brand.500"}
            color={"brand.900"}
            w={"full"}
            href={`/search/[id]`}
            as={`/search/${item.date5}`}
            name={item.nam}
            boxShadow={"dark-lg"}
          />
        </Box>
      </Stack>
    </Box>
  );
};

BlogOutstanding.propTypes = {
  item: PropTypes.object,
};
