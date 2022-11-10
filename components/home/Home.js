import { useRouter } from "next/router";

import { Container, Heading, HStack, Stack, VStack } from "@chakra-ui/react";

import PropTypes from "prop-types";

import Marquee from "react-fast-marquee";

import { SerchScreen } from "../search/SerchScreen";

import { Breakpoints } from "../../helpers/Breakpoints";

import { ScreenCarousel } from "./ScreenCarousel";

import { ScreenHero } from "./ScreenHero";
import { CreateNewAcount } from "./CreateNewAcount";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const Home = ({ listData, latestCartSelect }) => {
  // useRouter
  const { locale } = useRouter();
  // Breakpoints
  const { points25 } = Breakpoints();

  return (
    <Container maxW={"container.xs"} px={{ base: 1, sm: 4 }}>
      {/* hero */}
      <ScreenHero />

      {/* create account */}
      <CreateNewAcount />

      <VStack spacing={10} mt={16}>
        {/* Marquee */}
        <Stack display={listData[0] ? "flex" : "none"} w={"full"} spacing={10}>
          <Heading w={"full"} fontSize={points25}>
            {locale === "en-US" ? en.home.hD : es.home.hD}
          </Heading>
          <HStack>
            <Marquee gradient={false} style={{ height: "420px" }}>
              {listData.map((data) => (
                <SerchScreen key={data.id} {...data} />
              ))}
            </Marquee>
          </HStack>
        </Stack>

        {/* Carousel */}
        <Stack
          display={!!latestCartSelect[2] ? "flex" : "none"}
          w={"full"}
          spacing={0}
          justifyContent={"center"}
        >
          <Heading w={"full"} size={"lg"} fontSize={points25} mb={10}>
            {locale === "en-US" ? en.home.hE : es.home.hE}
          </Heading>
          <ScreenCarousel latestCartSelect={latestCartSelect} />
        </Stack>
      </VStack>
    </Container>
  );
};

PropTypes.Home = {
  listData: PropTypes.array.isRequired,
  latestCartSelect: PropTypes.array,
};
