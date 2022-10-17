import {
  Box,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

import { testimonials } from "../../data/dbSeed";

import { TestimonialCard } from "./TestimonialCard";
import { AddTestimonials } from "./AddTestimonials";

export const ScreenAbout = () => {
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
            People love us
          </chakra.h3>
          <chakra.h1
            py={5}
            fontSize={48}
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            color={useColorModeValue("gray.700", "gray.50")}
          >
            {"You're in good company"}
          </chakra.h1>
          <chakra.h2
            margin={"auto"}
            width={"70%"}
            fontFamily={"Inter"}
            fontWeight={"medium"}
            color={useColorModeValue("gray.500", "gray.400")}
          >
            See why over{" "}
            <chakra.strong color={useColorModeValue("gray.700", "gray.50")}>
              150,000+
            </chakra.strong>{" "}
            influencers use BrandChackras to manage their content!
          </chakra.h2>
          <AddTestimonials />
        </Box>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={"20"}
          mt={16}
          mx={"auto"}
        >
          {testimonials.map((cardInfo, index) => (
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
