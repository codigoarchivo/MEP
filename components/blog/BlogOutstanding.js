import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Breakpoints from "../../helpers/Breakpoints";

import ModeColor from "../../helpers/ModeColor";

import NavLink from "../../utils/Navlink";

const BlogOutstanding = (item) => {
  const { bg3, bgText, bg4, bg5 } = ModeColor();

  const { bordes } = Breakpoints();
  return (
    <Box
      maxW={{ base: "240px", sm: "470px", lg: "240px" }}
      w={"full"}
      bg={bg3}
      boxShadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      backgroundColor={"#fff"}
      border={bordes}
    >
      <Stack
        w={"full"}
        textAlign={"center"}
        p={{ base: 3, md: 6 }}
        color={bgText}
        align={"center"}
        spacing={10}
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
        <Heading size={"md"}>{item.name}</Heading>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text fontSize={"6xl"} fontWeight={800}>
            {item.price}
          </Text>
        </Stack>
        <Box bg={bg5}>
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
