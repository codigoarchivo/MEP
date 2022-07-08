import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import { Arrow } from "../../helpers/IconNew";

import NavLink from "../../utils/Navlink";

const BlogWork = ({ bA, bB, bC, bD, create, points }) => {
  return (
    <Stack w={"full"} minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Stack
        flex={1}
        align={"center"}
        justify={"center"}
        spacing={6}
        w={"full"}
        maxW={"lg"}
      >
        <Heading fontSize={points} w={"full"}>
          <Text
            color={"brand.900"}
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: useBreakpointValue({ base: "20%", md: "30%" }),
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "brand.500",
              zIndex: -1,
            }}
          >
            {bA}
          </Text>
          <br />{" "}
          <Text color={"brand.500"} as={"span"}>
            {bB}
          </Text>{" "}
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
          {bC}
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          position={"relative"}
        >
          <NavLink
            rounded={"full"}
            variant={"primary"}
            href={`/auth/create`}
            as={`/auth/create`}
            name={create}
          />
          <Box right={20}>
            <Icon
              as={Arrow}
              color={useColorModeValue("gray.800", "gray.300")}
              w={"100px"}
              position={"absolute"}
              left={"150px"}
              top={"30px"}
            />
            <Text
              fontSize={"lg"}
              fontFamily={"Caveat"}
              position={"absolute"}
              left={"170px"}
              top={"-10px"}
              transform={"rotate(10deg)"}
            >
              {bD}
            </Text>
          </Box>
        </Stack>
      </Stack>

      <Flex flex={1} position={"relative"}>
        <Image
          src={"/img/secondary.png"}
          alt="Hero"
          layout="fill"
          objectFit="contain"
        />
      </Flex>
    </Stack>
  );
};

export default BlogWork;
