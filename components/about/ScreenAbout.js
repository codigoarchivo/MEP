import {
  Box,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

import { DownloadIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";

import { testimonials } from "../../data/dbSeed";

import { TestimonialCard } from "./TestimonialCard";

import { AddTestimonials } from "./AddTestimonials";

import { es } from "../../translations/es";
import { en } from "../../translations/en";

export const ScreenAbout = ({ coments }) => {
  const { locale } = useRouter();

  return (
    <>
      <Flex
        textAlign={"center"}
        pt={10}
        justifyContent={"center"}
        direction={"column"}
        width={"full"}
      >
        <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
          <chakra.h3
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
          >
            {locale === "en-US" ? en.about.aE : es.about.aE}
          </chakra.h3>
          <chakra.h1
            py={5}
            fontSize={48}
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            color={useColorModeValue("gray.700", "gray.50")}
          >
            {locale === "en-US" ? en.about.aF : es.about.aF}
          </chakra.h1>
          <chakra.h2
            margin={"auto"}
            width={"70%"}
            fontFamily={"Inter"}
            fontWeight={"medium"}
            color={useColorModeValue("gray.500", "gray.400")}
          >
            {locale === "en-US" ? en.about.aG : es.about.aG}{" "}
            <chakra.strong color={useColorModeValue("gray.700", "gray.50")}>
              {locale === "en-US" ? en.about.aH : es.about.aH}{" "}
            </chakra.strong>{" "}
            {locale === "en-US" ? en.about.aI : es.about.aI}
          </chakra.h2>
          <AddTestimonials />
        </Box>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={"20"}
          mt={16}
          mx={"auto"}
        >
          {coments.map((cardInfo, index) => (
            <TestimonialCard {...cardInfo} index={index} key={index} />
          ))}
        </SimpleGrid>
        <Box>
          <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={"purple.400"}>
            <DownloadIcon />
          </Icon>
        </Box>
      </Flex>
    </>
  );
};

ScreenAbout.propTypes = {
  coments: PropTypes.array,
};