import Image from "next/image";

import {
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  chakra,
  VStack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

import { backgrounds } from "../../data/dbSeed";

export const BlogEdgar = () => {
  return (
    <VStack spacing={20}>
      <Box
        width={{ base: "full", sm: "lg", lg: "xl" }}
        margin={"auto"}
        textAlign={"center"}
      >
        <chakra.h3
          fontFamily={"Work Sans"}
          fontWeight={"bold"}
          fontSize={20}
          textTransform={"uppercase"}
          color={"purple.400"}
        >
          I'm ready
        </chakra.h3>
        <chakra.h1
          py={5}
          fontSize={48}
          fontFamily={"Work Sans"}
          fontWeight={"bold"}
          color={useColorModeValue("gray.700", "gray.50")}
        >
          To face any challenge
        </chakra.h1>
      </Box>
      <Stack
        maxW={"1000px"}
        spacing={10}
        boxShadow={"lg"}
        rounded={"xl"}
        p={10}
        position={"relative"}
        bg={useColorModeValue("white", "gray.800")}
        _before={{
          content: '""',
          position: "absolute",
          zIndex: "-1",
          height: "full",
          maxW: "1000px",
          width: "full",
          filter: "blur(40px)",
          transform: "scale(1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          top: 0,
          left: 0,
          backgroundImage: backgrounds[2 % 4],
        }}
      >
        <Heading
          fontFamily={"Work Sans"}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          lineHeight={"110%"}
        >
          Edgars{" "}
          <Text as={"span"} color={"gray.500"}>
            Pendulum
          </Text>
        </Heading>
        <Box w={"full"} position={"relative"} textAlign="center">
          <Image
            src={
              "/img/certificate.png" || `https://via.placeholder.com/600.png`
            }
            alt="Recibo pago"
            width={900}
            height={600}
          />
        </Box>
      </Stack>
    </VStack>
  );
};

BlogEdgar.propTypes = {
  data: PropTypes.string,
};
