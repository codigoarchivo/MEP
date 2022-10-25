import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import {
  Box,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { DownloadIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";

import { TestimonialCard } from "./TestimonialCard";

import { AddTestimonials } from "./AddTestimonials";

import { testimonialsList } from "../../actions/user";

import { db } from "../../firebase/config";

import { es } from "../../translations/es";
import { en } from "../../translations/en";

export const ScreenAbout = ({ coments, activeSelect }) => {
  const dispatch = useDispatch();

  const { photoURL, displayName, uid } = activeSelect;

  const { locale } = useRouter();

  const next = () => {
    const q = query(
      collection(db, "coments"),
      orderBy("cre", "desc"),
      startAfter(coments[coments.length - 1]?.cre),
      limit(4)
    );

    onSnapshot(q, (snapshot) => {
      const coments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (coments.length === 0) {
        return coments;
      }

      dispatch(testimonialsList(coments));
    });
  };

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
        <Box
          display={
            [photoURL, displayName, uid].includes(undefined)
              ? "none"
              : "initial"
          }
        >
          <Icon
            viewBox="0 0 40 35"
            onClick={next}
            mt={14}
            boxSize={10}
            color={"purple.400"}
            cursor={"pointer"}
          >
            <DownloadIcon />
          </Icon>
        </Box>
      </Flex>
    </>
  );
};

ScreenAbout.propTypes = {
  coments: PropTypes.array,
  activeSelect: PropTypes.object,
};
