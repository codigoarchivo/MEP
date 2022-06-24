import {
  Box,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import ModeColor from "../../helpers/ModeColor";

import NavLink from "../../utils/Navlink";

const BlogOutstanding = (item) => {
  const { bg3, bgText, bg4, bg5 } = ModeColor();

  return (
    <Box
      maxW={"330px"}
      w={"full"}
      bg={bg3}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Stack textAlign={"center"} p={6} color={bgText} align={"center"}>
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
      </Stack>

      <Box bg={bg5} px={3} py={10}>
        <List spacing={3} mb={10}>
          <ListItem>
            <ListIcon as={CheckIcon} color="brand.500" />
            {item.date1}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="brand.500" />
            {item.date2}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="brand.500" />
            {item.date3}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="brand.500" />
            {item.date4}
          </ListItem>
        </List>

        <NavLink
          w={"full"}
          rounded={"xl"}
          variant={"primary"}
          href={`/search/[id]`}
          as={`/search/${item.date5}`}
          name={"Start your trial"}
          boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
        />
      </Box>
    </Box>
  );
};

export default BlogOutstanding;
