import { Box, Stack, Text } from "@chakra-ui/react";

import ModeColor from "../../helpers/ModeColor";

import NavLink from "../../utils/Navlink";

const BlogOutstanding = (item) => {
  const { bg3, bgText, bg4, bg5 } = ModeColor();

  return (
    <Box
      maxW={"250px"}
      w={"full"}
      bg={bg3}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Stack
        w={"full"}
        textAlign={"center"}
        p={6}
        color={bgText}
        align={"center"}
      >
        <Text
          fontSize={"sm"}
          fontWeight={500}
          bg={bg4}
          p={2}
          px={3}
          color={"brand.900"}
          rounded={"full"}
        >
          {item.title}
        </Text>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text fontSize={"6xl"} fontWeight={800}>
            {item.price}
          </Text>
        </Stack>
        <Box bg={bg5} px={3} py={10}>
          <NavLink
            w={"full"}
            variant={"primary"}
            href={`/search/[id]`}
            as={`/search/${item.date5}`}
            name={item.nam}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default BlogOutstanding;
