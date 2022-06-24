import Image from "next/image";

import {
  Box,
  Button,
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

const BlogWork = () => {
  const myLoader = ({ src, width, quality }) => {
    return `https://firebasestorage.googleapis.com/v0/b/epmp-199ff.appspot.com/o/fotosStaticas%2${src}?alt=media&token=28a889c0-ef17-46c8-8880-98643a43b838&w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <Stack w={"full"} minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
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
              Cómo Nosotros
            </Text>
            <br />{" "}
            <Text color={"brand.500"} as={"span"}>
              Trabajamos
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Relaja tu mente, inspira hondo, cuenta hasta tres. Estás fluyendo.
            El universo te rodea y te abraza. Acabas de entrar en el universo
            etéreo y espiritual. Nosotros trabajamos mediante las medidas de
            bioseguridad y no presencial mediante medios, online no le quitamos
            para nada su tiempo.
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
              name={"Create una cuenta"}
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
                Starting at $15/mo
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} position={"relative"}>
        <Image
          loader={myLoader}
          src={"Fhero1.jpg"}
          alt="Hero"
          layout="fill"
          objectFit="contain"
        />
      </Flex>
    </Stack>
  );
};

export default BlogWork;
