import React from "react";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import Image from "next/image";

import PropTypes from "prop-types";

import Marquee from "react-fast-marquee";

import Carousel from "nuka-carousel";

import SerchScreen from "../search/SerchScreen";

import Breakpoints from "../../helpers/Breakpoints";

import NavLink from "../../utils/Navlink";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import en from "../../translations/en";
import es from "../../translations/es";

const Home = ({ listData, latestCartSelect }) => {
  // useRouter
  const { locale } = useRouter();
  // Breakpoints
  const { content5, bordes } = Breakpoints();

  return (
    <Container maxW={"container.xs"}>
      <VStack spacing={0}>
        <Stack flexDirection={content5} alignItems={"center"}>
          <VStack w={"md"} border={bordes} p={5} boxShadow={"lg"}>
            <Heading w={"full"} size={"lg"}>
              {locale === "en" ? en.home.hA : es.home.hA}
            </Heading>
            <Text>{locale === "en" ? en.home.hB : es.home.hB}</Text>
          </VStack>
          <Box w={"lg"} h={500} position={"relative"}>
            <Image
              src={"/img/primary.png"}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Stack>
        <Stack
          p={5}
          w={"full"}
          flexDirection={"row"}
          backgroundColor={"brand.900"}
          alignItems={"center"}
          spacing={0}
        >
          <Heading
            textTransform={"capitalize"}
            w={"full"}
            size={"sm"}
            color={"brand.500"}
          >
            {locale === "en" ? en.home.hC : es.home.hC}
          </Heading>
          <Box>
            <NavLink
              variant={"primary"}
              name={locale === "en" ? en.create : es.create}
              href={"/auth/create"}
            />
          </Box>
        </Stack>
      </VStack>
      <VStack spacing={10} mt={16}>
        {listData[0] ? (
          <Stack w={"full"} spacing={10}>
            <Heading w={"full"} size={"lg"}>
              {locale === "en" ? en.home.hD : es.home.hD}
            </Heading>
            <HStack>
              <Marquee>
                {listData.map((data) => (
                  <SerchScreen key={data.id} {...data} />
                ))}
              </Marquee>
            </HStack>
          </Stack>
        ) : (
          ""
        )}

        {!!latestCartSelect[2] ? (
          <Stack w={"full"} spacing={10}>
            <Heading w={"full"} size={"lg"}>
              {locale === "en" ? en.home.hE : es.home.hE}
            </Heading>
            <Box position={"relative"}>
              <Carousel
                easing="easeInOutElastic"
                wrapAround={true}
                slidesToScroll={4}
                slidesToShow={4}
                cellSpacing={40}
                slideWidth={0.75}
                cellAlign={"left"}
                defaultControlsConfig={{
                  nextButtonText: (
                    <Button
                      as={"div"}
                      variant={"primary"}
                      rounded={"full"}
                      w={11}
                      fontSize={"2xl"}
                    >
                      <ChevronRightIcon />
                    </Button>
                  ),
                  prevButtonText: (
                    <Button
                      as={"div"}
                      variant={"primary"}
                      rounded={"full"}
                      w={11}
                      fontSize={"2xl"}
                    >
                      <ChevronLeftIcon />
                    </Button>
                  ),
                  pagingDotsStyle: {
                    fill: "transparent",
                  },
                  nextButtonStyle: {
                    backgroundColor: "transparent",
                  },
                  prevButtonStyle: {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {latestCartSelect.map((data) => (
                  <SerchScreen key={data.id} {...data} />
                ))}
              </Carousel>
            </Box>
          </Stack>
        ) : (
          ""
        )}
      </VStack>
    </Container>
  );
};

PropTypes.Home = {
  listData: PropTypes.array,
  latestCartSelect: PropTypes.array,
};

export default Home;
