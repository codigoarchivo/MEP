import React, { useMemo } from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import {
  chakra,
  VStack,
  Heading,
  Stack,
  Text,
  Box,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";
import { CategoryAll, Product, ShopAll } from "../../helpers/IconNew";
import { ModeColor } from "../../helpers/ModeColor";

import { StatsCard } from "./StatsCard";
import { BlogWork } from "./BlogWork";
import { BlogEdgar } from "./BlogEdgar";
import { BlogOutstanding } from "./BlogOutstanding";
import { BlogCategory } from "./BlogCategory";
import { BlogEnergy } from "./BlogEnergy";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const BlogScreen = ({ categories, buys, product }) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { listData: list = [] } = useSelector(({ listca }) => listca);
  // selector
  const { listData: listp = [] } = useSelector(({ list }) => list);
  // Breakpoints
  const { displayOff2, bordes, points25, content7 } = Breakpoints();
  // router
  const { push, locale } = useRouter();

  if ([!list[0]].includes(true) && !!a.uid) {
    push("/");
  }

  const one = useMemo(() => listp[Math.floor(Math.random() * listp.length)], [
    listp,
  ]);

  const dOne = list.find((i) => i.id !== one?.ct);

  const two = useMemo(() => listp[Math.floor(Math.random() * listp.length)], [
    listp,
  ]);

  const dTwo = list.find((i) => i.id !== two?.ct);

  const three = useMemo(() => listp[Math.floor(Math.random() * listp.length)], [
    listp,
  ]);

  const dThree = list.find((i) => i.id !== three?.ct);

  const { bg7 } = ModeColor();
  return (
    <Stack flexDirection={content7} spacing={0}>
      <VStack
        mb={{ base: "50px", lg: "0px" }}
        w={{ base: "100%", lg: "75%" }}
        boxShadow={"lg"}
        border={bordes}
        p={{ base: 2, lg: 5 }}
        mr={{ base: 0, lg: 5 }}
      >
        {/* BlogWork */}
        <BlogWork
          bA={locale === "en-US" ? en.blog.bA : es.blog.bA}
          bB={locale === "en-US" ? en.blog.bB : es.blog.bB}
          bC={locale === "en-US" ? en.blog.bC : es.blog.bC}
          bD={locale === "en-US" ? en.blog.bD : es.blog.bD}
          create={locale === "en-US" ? en.create : es.create}
          points={points25}
          displayOff={displayOff2}
        />
        {/* bienvenida */}
        <BlogEdgar data={locale === "en-US" ? en.blog.bE : es.blog.bE} />
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            {locale === "en-US" ? en.blog.bF : es.blog.bF}
          </chakra.h1>
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 5, lg: 12 }}
          >
            <StatsCard
              title={locale === "en-US" ? en.products : es.products}
              stat={product || 0}
              icon={<Product h={12} w={12} />}
            />
            <StatsCard
              title={locale === "en-US" ? en.sales : es.sales}
              stat={buys || 0}
              icon={<ShopAll h={12} w={12} />}
            />
            <StatsCard
              title={locale === "en-US" ? en.categories : es.categories}
              stat={categories || 0}
              icon={<CategoryAll h={12} w={12} />}
            />
          </SimpleGrid>
        </Box>
        <Stack
          display={
            !!listp[0] && one !== "" && two !== "" && three !== ""
              ? "block"
              : "none"
          }
          w={"full"}
          justifyContent={"center"}
          textAlign={"center"}
          style={{ marginBottom: "60px" }}
        >
          <Heading
            fontWeight={600}
            lineHeight={"110%"}
            fontSize={points25}
            py={20}
          >
            {locale === "en-US" ? en.blog.bG : es.blog.bG}{" "}
            <Text as={"span"} color={bg7}>
              {locale === "en-US" ? en.blog.bH : es.blog.bH}
            </Text>
          </Heading>

          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 5, lg: 6 }}
            justifyItems={"center"}
          >
            {[
              {
                title: dOne && locale === "en-US" ? dOne?.na?.en : dOne?.na?.es,
                name: locale === "en-US" ? one?.na?.en : one?.na?.es,
                price: `${one?.pr}$`,
                date5: `${one?.id}`,
              },
              {
                title: dTwo && locale === "en-US" ? dTwo?.na?.en : dTwo?.na?.es,
                name: locale === "en-US" ? two?.na?.en : two?.na?.es,
                price: `${two?.pr}$`,
                date5: `${two?.id}`,
              },
              {
                title:
                  dThree && locale === "en-US" ? dThree?.na?.en : dThree?.na?.es,
                name: locale === "en-US" ? three?.na?.en : three?.na?.es,
                price: `${three?.pr}$`,
                date5: `${three?.id}`,
              },
            ].map((item, index) => (
              <BlogOutstanding
                key={index}
                {...item}
                nam={locale === "en-US" ? en.blog.bI : es.blog.bI}
              />
            ))}
          </SimpleGrid>
        </Stack>
        {/* trabajo */}
        <Box>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontWeight={600} lineHeight={"110%"} fontSize={points25}>
              {locale === "en-US" ? en.blog.bJ : es.blog.bJ}{" "}
              <Text as={"span"} color={bg7}>
                {locale === "en-US" ? en.blog.bK : es.blog.bK}
              </Text>
            </Heading>
          </Stack>

          <Container maxW={"6xl"} mt={20} px={0}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {[
                {
                  title: locale === "en-US" ? en.blog.bL : es.blog.bL,
                  text: locale === "en-US" ? en.blog.bLL : es.blog.bLL,
                },
                {
                  title: locale === "en-US" ? en.blog.bM : es.blog.bM,
                  text: locale === "en-US" ? en.blog.bN : es.blog.bN,
                },
                {
                  title: locale === "en-US" ? en.blog.bÑ : es.blog.bÑ,
                  text: locale === "en-US" ? en.blog.bO : es.blog.bO,
                },
                {
                  title: locale === "en-US" ? en.blog.bP : es.blog.bP,
                  text: locale === "en-US" ? en.blog.bR : es.blog.bR,
                },
                {
                  title: locale === "en-US" ? en.blog.bS : es.blog.bS,
                  text: locale === "en-US" ? en.blog.bT : es.blog.bT,
                },
                {
                  title: locale === "en-US" ? en.blog.bU : es.blog.bU,
                  text: locale === "en-US" ? en.blog.bV : es.blog.bV,
                },
                {
                  title: locale === "en-US" ? en.blog.bW : es.blog.bW,
                  text: locale === "en-US" ? en.blog.bX : es.blog.bX,
                },
                {
                  title: locale === "en-US" ? en.blog.bY : es.blog.bY,
                  text: locale === "en-US" ? en.blog.bZ : es.blog.bZ,
                },
              ].map((item, index) => (
                <BlogCategory key={index} {...item} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>
        {/* BlogEnergy */}
        <BlogEnergy
          bAa={locale === "en-US" ? en.blog.bAa : es.blog.bAa}
          bBb={locale === "en-US" ? en.blog.bBb : es.blog.bBb}
          bCc={locale === "en-US" ? en.blog.bCc : es.blog.bCc}
          bDd={locale === "en-US" ? en.blog.bDd : es.blog.bDd}
          bEe={locale === "en-US" ? en.blog.bEe : es.blog.bEe}
          bFf={locale === "en-US" ? en.blog.bFf : es.blog.bFf}
          bHh={locale === "en-US" ? en.blog.bHh : es.blog.bHh}
          bIi={locale === "en-US" ? en.blog.bIi : es.blog.bIi}
          points={points25}
        />
      </VStack>
      <Stack
        w={{ base: "100%", lg: "25%" }}
        boxShadow={"lg"}
        height={"min-content"}
        as={"aside"}
        border={bordes}
        p={5}
        position={"relative"}
      >
        {[
          {
            title: locale === "en-US" ? en.blog.bJj : es.blog.bJj,
            text: locale === "en-US" ? en.blog.bKk : es.blog.bKk,
          },
          {
            title: locale === "en-US" ? en.blog.bLl : es.blog.bLl,
            text: locale === "en-US" ? en.blog.bMm : es.blog.bMm,
          },
          {
            title: locale === "en-US" ? en.blog.bNn : es.blog.bNn,
            text: locale === "en-US" ? en.blog.bOo : es.blog.bOo,
          },
          {
            title: locale === "en-US" ? en.blog.bPp : es.blog.bPp,
            text: locale === "en-US" ? en.blog.bQq : es.blog.bQq,
          },
          {
            title: locale === "en-US" ? en.blog.bRr : es.blog.bRr,
            text: locale === "en-US" ? en.blog.bSs : es.blog.bSs,
          },
          {
            title: locale === "en-US" ? en.blog.bTt : es.blog.bTt,
            text: locale === "en-US" ? en.blog.bUu : es.blog.bUu,
          },
        ].map((item, key) => (
          <VStack key={key} w={"full"} p={1} display={"inline-block"}>
            <Heading size={"md"}>{item.title}</Heading>
            <Text>{item.text}</Text>
          </VStack>
        ))}
      </Stack>
    </Stack>
  );
};

BlogScreen.propTypes = {
  categories: PropTypes.string,
  buys: PropTypes.string,
  product: PropTypes.string,
};
