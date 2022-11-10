import Image from "next/image";

import { useRouter } from "next/router";

import {
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  chakra,
  VStack,
  useColorMode,
  HStack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

import { backgrounds } from "../../data/dbSeed";

import { Breakpoints } from "../../helpers/Breakpoints";

import { es } from "../../translations/es";
import { en } from "../../translations/en";

export const BlogEdgar = () => {
  const { locale } = useRouter();

  const { fondo } = Breakpoints();

  // toogle color
  const { colorMode } = useColorMode();
  return (
    <VStack spacing={{ base: 0, md: 20 }}>
      <Box margin={"auto"} textAlign={"center"}>
        <chakra.h3
          fontFamily={"Work Sans"}
          fontWeight={"bold"}
          fontSize={20}
          textTransform={"uppercase"}
          color={"purple.400"}
        >
          {locale === "en-US" ? en.about.aC : es.about.aC}
        </chakra.h3>
        <chakra.h1
          py={5}
          fontSize={48}
          fontFamily={"Work Sans"}
          fontWeight={"bold"}
          color={useColorModeValue("gray.700", "gray.50")}
        >
          {locale === "en-US" ? en.about.aD : es.about.aD}
        </chakra.h1>
      </Box>
      <Stack
        width={"97vw"}
        maxW={"1000px"}
        spacing={{ base: 0, md: 10 }}
        boxShadow={"dark-lg"}
        rounded={"xl"}
        p={{ base: 5, md: 10 }}
        position={"relative"}
        bg={fondo}
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
        <HStack w={"full"} justifyContent={"space-between"}>
          <Heading
            fontFamily={"Brush Script MT"}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            lineHeight={"110%"}
          >
            Edgars{" "}
            <Text as={"span"} color={"gray.500"}>
              Pendulum
            </Text>
          </Heading>
          <Box w={200} h={100} position={"relative"}>
            <Image
              src={`/img/${colorMode === "dark" ? "logo" : "logob"}.png`}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          </Box>
        </HStack>

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
