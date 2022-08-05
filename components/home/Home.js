import React from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
  chakra,
} from "@chakra-ui/react";

import Image from "next/image";

import PropTypes from "prop-types";

import Marquee from "react-fast-marquee";

import Carousel from "nuka-carousel";

import { SerchScreen } from "../search/SerchScreen";

import { Breakpoints } from "../../helpers/Breakpoints";

import { NavLink } from "../../utils/Navlink";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { ModeColor } from "../../helpers/ModeColor";

export const Home = ({ listData, latestCartSelect, locale, es, en }) => {
  // Breakpoints
  const { content5, bordes, displayOff1, all1, points25 } = Breakpoints();
  // use Carousel
  const variant = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 3, xl: 4 });

  const valImgW = useBreakpointValue({ base: 250, md: 400, lg: 450 });
  const valImgH = useBreakpointValue({ base: 300, md: 450, lg: 550 });

  const { modelE } = ModeColor();
  return (
    <Container maxW={"container.xs"} px={{ base: 1, sm: 4 }}>
      <Stack
        flexDirection={content5}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={10}
      >
        <VStack
          w={all1}
          border={bordes}
          p={5}
          boxShadow={"lg"}
          backgroundColor={modelE}
          mb={{ base: 5, md: 0 }}
        >
          <Heading w={"full"} fontSize={points25} wordBreak={"break-word"}>
            {locale === "en" ? en.home.hA : es.home.hA}
          </Heading>
          <Text size={["sx", "sm", "md", "lg", "xl"]} wordBreak={"break-word"}>
            {locale === "en" ? en.home.hB : es.home.hB}
          </Text>
        </VStack>
        <Image
          src={"/img/primary.png"}
          alt="Picture of the author"
          layout="fixed"
          width={valImgW}
          height={valImgH}
          priority={true}
        />
      </Stack>
      <Stack
        p={5}
        w={"full"}
        flexDirection={"row"}
        backgroundColor={"brand.800"}
        alignItems={"center"}
        spacing={0}
      >
        <Heading
          display={displayOff1}
          textTransform={"capitalize"}
          w={"full"}
          mr={5}
          size={"sm"}
          color={"brand.900"}
        >
          {locale === "en" ? en.home.hC : es.home.hC}
        </Heading>
        <Box>
          <NavLink
            backgroundColor={"brand.900"}
            color={"brand.700"}
            size={"sm"}
            variant={"primary"}
            name={locale === "en" ? en.create : es.create}
            href={"/auth/create"}
          />
        </Box>
      </Stack>
      <VStack spacing={10} mt={16}>
        {listData[0] ? (
          <Stack w={"full"} spacing={10}>
            <Heading w={"full"} fontSize={points25}>
              {locale === "en" ? en.home.hD : es.home.hD}
            </Heading>
            <HStack>
              <Marquee gradient={false} style={{ height: "420px" }}>
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
          <Stack w={"full"} spacing={0} justifyContent={"center"}>
            <Heading w={"full"} size={"lg"} fontSize={points25} mb={10}>
              {locale === "en" ? en.home.hE : es.home.hE}
            </Heading>

            <Carousel
              easing="easeInOutElastic"
              wrapAround={true}
              slidesToScroll={3}
              slidesToShow={variant}
              cellSpacing={0}
              slideWidth={0.75}
              cellAlign={"center"}
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
                <chakra.ul key={data.id}>
                  <SerchScreen {...data} />
                </chakra.ul>
              ))}
            </Carousel>
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
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
