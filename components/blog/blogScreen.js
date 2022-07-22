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

import { StatsCard } from "./StatsCard";
import { BlogWork } from "./BlogWork";
import { BlogEdgar } from "./BlogEdgar";
import { BlogOutstanding } from "./BlogOutstanding";
import { BlogCategory } from "./BlogCategory";
import { BlogEnergy } from "./BlogEnergy";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const BlogScreen = ({ categories, buys, product }) => {
  // Breakpoints
  const { displayOff2, bordes, points25, content7 } = Breakpoints();
  // selector
  const { listData: list = [] } = useSelector(({ category }) => category);
  // selector
  const { listData = [] } = useSelector(({ product }) => product);
  // router
  const { push, locale } = useRouter();

  if ([!list[0]].includes(true)) {
    push("/");
  }

  const one = useMemo(
    () => listData[Math.floor(Math.random() * listData.length)],
    [listData]
  );

  const { na: na1 } = list.find((i) => i.id !== one?.ct);

  const two = useMemo(
    () => listData[Math.floor(Math.random() * listData.length)],
    [listData]
  );

  const { na: na2 } = list.find((i) => i.id !== two?.ct);

  const three = useMemo(
    () => listData[Math.floor(Math.random() * listData.length)],
    [listData]
  );

  const { na: na3 } = list.find((i) => i.id !== three?.ct);

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
          bA={locale === "en" ? en.blog.bA : es.blog.bA}
          bB={locale === "en" ? en.blog.bB : es.blog.bB}
          bC={locale === "en" ? en.blog.bC : es.blog.bC}
          bD={locale === "en" ? en.blog.bD : es.blog.bD}
          create={locale === "en" ? en.create : es.create}
          points={points25}
          displayOff={displayOff2}
        />
        {/* bienvenida */}
        <BlogEdgar data={locale === "en" ? en.blog.bE : es.blog.bE} />
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            {locale === "en" ? en.blog.bF : es.blog.bF}
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={locale === "en" ? en.products : es.products}
              stat={product || 0}
              icon={<Product h={12} w={12} />}
            />
            <StatsCard
              title={locale === "en" ? en.sales : es.sales}
              stat={buys || 0}
              icon={<ShopAll h={12} w={12} />}
            />
            <StatsCard
              title={locale === "en" ? en.categories : es.categories}
              stat={categories || 0}
              icon={<CategoryAll h={12} w={12} />}
            />
          </SimpleGrid>
        </Box>
        <Stack
          display={
            !!listData[0] && one !== "" && two !== "" && three !== ""
              ? "block"
              : "none"
          }
          pt={30}
          w={"full"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          <Heading
            fontWeight={600}
            lineHeight={"110%"}
            color={"brand.900"}
            fontSize={points25}
            my={10}
          >
            {locale === "en" ? en.blog.bG : es.blog.bG}{" "}
            <Text as={"span"} color={"brand.500"}>
              {locale === "en" ? en.blog.bH : es.blog.bH}
            </Text>
          </Heading>

          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 5, lg: 6 }}
            justifyItems={"center"}
          >
            {[
              {
                title: locale === "en" ? na1?.en : na1?.es,
                name: one?.na,
                price: `${one?.pr}$`,
                date5: `${one?.id}`,
              },
              {
                title: locale === "en" ? na2?.en : na2?.es,
                name: two?.na,
                price: `${two?.pr}$`,
                date5: `${two?.id}`,
              },
              {
                title: locale === "en" ? na3?.en : na3?.es,
                name: three?.na,
                price: `${three?.pr}$`,
                date5: `${three?.id}`,
              },
            ].map((item, index) => (
              <BlogOutstanding
                key={index}
                {...item}
                nam={locale === "en" ? en.blog.bI : es.blog.bI}
              />
            ))}
          </SimpleGrid>
        </Stack>
        {/* trabajo */}
        <Box p={{ base: 0, sm: 4 }} pt={20}>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading
              fontWeight={600}
              lineHeight={"110%"}
              color={"brand.900"}
              fontSize={points25}
            >
              {locale === "en" ? en.blog.bJ : es.blog.bJ}{" "}
              <Text as={"span"} color={"brand.500"}>
                {locale === "en" ? en.blog.bK : es.blog.bK}
              </Text>
            </Heading>
          </Stack>

          <Container maxW={"6xl"} mt={20} px={0}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {[
                {
                  title: locale === "en" ? en.blog.bL : es.blog.bL,
                  text: locale === "en" ? en.blog.bLL : es.blog.bLL,
                },
                {
                  title: locale === "en" ? en.blog.bM : es.blog.bM,
                  text: locale === "en" ? en.blog.bN : es.blog.bN,
                },
                {
                  title: locale === "en" ? en.blog.bÑ : es.blog.bÑ,
                  text: locale === "en" ? en.blog.bO : es.blog.bO,
                },
                {
                  title: locale === "en" ? en.blog.bP : es.blog.bP,
                  text: locale === "en" ? en.blog.bR : es.blog.bR,
                },
                {
                  title: locale === "en" ? en.blog.bS : es.blog.bS,
                  text: locale === "en" ? en.blog.bT : es.blog.bT,
                },
                {
                  title: locale === "en" ? en.blog.bU : es.blog.bU,
                  text: locale === "en" ? en.blog.bV : es.blog.bV,
                },
                {
                  title: locale === "en" ? en.blog.bW : es.blog.bW,
                  text: locale === "en" ? en.blog.bX : es.blog.bX,
                },
                {
                  title: locale === "en" ? en.blog.bY : es.blog.bY,
                  text: locale === "en" ? en.blog.bZ : es.blog.bZ,
                },
              ].map((item, index) => (
                <BlogCategory key={index} {...item} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>
        {/* BlogEnergy */}
        <BlogEnergy
          bAa={locale === "en" ? en.blog.bAa : es.blog.bAa}
          bBb={locale === "en" ? en.blog.bBb : es.blog.bBb}
          bCc={locale === "en" ? en.blog.bCc : es.blog.bCc}
          bDd={locale === "en" ? en.blog.bDd : es.blog.bDd}
          bEe={locale === "en" ? en.blog.bEe : es.blog.bEe}
          bFf={locale === "en" ? en.blog.bFf : es.blog.bFf}
          bHh={locale === "en" ? en.blog.bHh : es.blog.bHh}
          bIi={locale === "en" ? en.blog.bIi : es.blog.bIi}
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
            title: locale === "en" ? en.blog.bJj : es.blog.bJj,
            text: locale === "en" ? en.blog.bKk : es.blog.bKk,
          },
          {
            title: locale === "en" ? en.blog.bLl : es.blog.bLl,
            text: locale === "en" ? en.blog.bMm : es.blog.bMm,
          },
          {
            title: locale === "en" ? en.blog.bNn : es.blog.bNn,
            text: locale === "en" ? en.blog.bOo : es.blog.bOo,
          },
          {
            title: locale === "en" ? en.blog.bPp : es.blog.bPp,
            text: locale === "en" ? en.blog.bQq : es.blog.bQq,
          },
          {
            title: locale === "en" ? en.blog.bRr : es.blog.bRr,
            text: locale === "en" ? en.blog.bSs : es.blog.bSs,
          },
          {
            title: locale === "en" ? en.blog.bTt : es.blog.bTt,
            text: locale === "en" ? en.blog.bUu : es.blog.bUu,
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
