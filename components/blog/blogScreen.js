import React, { useMemo } from "react";

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

import Breakpoints from "../../helpers/Breakpoints";

import { seAside, seWork } from "../../data/SeStatic";

import { CategoryAll, Product, ShopAll } from "../../helpers/IconNew";

import StatsCard from "./StatsCard";
import BlogWork from "./BlogWork";
import BlogEdgar from "./BlogEdgar";
import BlogOutstanding from "./BlogOutstanding";
import BlogCategory from "./BlogCategory";
import BlogEnergy from "./BlogEnergy";

const BlogScreen = ({ categories, buys, product }) => {
  // Breakpoints
  const { content5, bordes } = Breakpoints();
  // selector
  const { list = [] } = useSelector(({ category }) => category);
  // selector
  const { listData = [] } = useSelector(({ product }) => product);
  // router
  const router = useRouter();

  if ([!!list[0] || !!listData[0]].includes(false)) {
    router.push("/");
  }

  const one = useMemo(
    () => listData[Math.floor(Math.random() * listData.length)],
    [listData]
  );

  const two = useMemo(
    () => listData[Math.floor(Math.random() * listData.length)],
    [listData]
  );

  const three = useMemo(
    () => listData[Math.floor(Math.random() * listData.length)],
    [listData]
  );

  return (
    <Stack flexDirection={content5} spacing={0}>
      <VStack w={"80%"} boxShadow={"lg"} border={bordes} p={5} mr={5}>
        {/* BlogWork */}
        <BlogWork />
        {/* bienvenida */}
        <BlogEdgar />
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            Our company is expanding, you could be too.
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"Productos"}
              stat={product || 0}
              icon={<Product h={12} w={12} />}
            />
            <StatsCard
              title={"Ventas"}
              stat={buys || 0}
              icon={<ShopAll h={12} w={12} />}
            />
            <StatsCard
              title={"Categorias"}
              stat={categories || 0}
              icon={<CategoryAll h={12} w={12} />}
            />
          </SimpleGrid>
        </Box>
        <Stack pt={30} w={"full"}>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading
              fontWeight={600}
              lineHeight={"110%"}
              color={"brand.900"}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            >
              Servicios{" "}
              <Text as={"span"} color={"brand.500"}>
                Destacados
              </Text>
            </Heading>
          </Stack>
          <Stack py={6} flexDirection={content5} spacing={0}>
            {[
              {
                title: `${list.find((item) => item.id === one.ct).na}`,
                price: `${one.pr}$`,
                date1: "Get a contract",
                date2: "Beat the competition",
                date3: "Improve in Training",
                date4: "Search opportunities",
                date5: `${one.id}`,
              },
              {
                title: `${list.find((item) => item.id === two.ct).na}`,
                price: `${two.pr}$`,
                date1: "Power your brand",
                date2: "Break the barriers",
                date3: "Surround yourself with the best",
                date4: "Get a Contract",
                date5: `${two.id}`,
              },
              {
                title: `${list.find((item) => item.id === three.ct).na}`,
                price: `${three.pr}$`,
                date1: "Production improvements",
                date2: "We avoid losses",
                date3: "New opportunities",
                date4: "feel in harmony",
                date5: `${three.id}`,
              },
            ].map((item, index) => (
              <BlogOutstanding key={index} {...item} />
            ))}
          </Stack>
        </Stack>
        {/* trabajo */}
        <Box p={4} pt={20}>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading
              fontWeight={600}
              lineHeight={"110%"}
              color={"brand.900"}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            >
              Algunas de nuestras{" "}
              <Text as={"span"} color={"brand.500"}>
                Categoria
              </Text>
            </Heading>
          </Stack>

          <Container maxW={"6xl"} mt={20}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {seWork.map((item, index) => (
                <BlogCategory key={index} {...item} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>
        {/* BlogEnergy */}
        <BlogEnergy />
      </VStack>
      <Stack
        w={"20%"}
        boxShadow={"lg"}
        height={"min-content"}
        as={"aside"}
        border={bordes}
        p={5}
        position={"relative"}
      >
        {seAside.map((item, key) => (
          <VStack key={key} w={"full"} p={1} display={"inline-block"}>
            <Heading size={"md"}>{item.title}</Heading>
            <Text>{item.text}</Text>
          </VStack>
        ))}
      </Stack>
    </Stack>
  );
};

export default BlogScreen;
