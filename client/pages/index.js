import React, { useEffect } from "react";

import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/layout/layout";

import Image from "next/image";

import Marquee from "react-fast-marquee";

import Breakpoints from "../helpers/Breakpoints";

import SerchScreen from "../components/search/SerchScreen";

import { listDataProduct } from "../actions/product";

import { db } from "../firebase/config";

import NavLink from "../helpers/Navlink";

const Home = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ product }) => product);
  // Breakpoints
  const { content5, bordes } = Breakpoints();

  useEffect(() => {
    dispatch(listDataProduct(data));
  }, [dispatch]);

  return (
    <Layout>
      <Container maxW={"container.xs"}>
        <VStack spacing={0}>
          <Stack flexDirection={content5} alignItems={"center"}>
            <VStack w={"md"} border={bordes} p={5} boxShadow={"lg"}>
              <Heading w={"full"} size={"lg"}>
                Visita Nuestra Tienda
              </Heading>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's .
              </Text>
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
            <Heading w={"full"} size={"sm"} color={"brand.500"}>
              Crea Una Cuenta Para Comenzar A Comprar
            </Heading>
            <Box>
              <NavLink
                variant={"primary"}
                name={"Crea Una Cuenta"}
                href={"/account/create"}
              />
            </Box>
          </Stack>
        </VStack>
        <VStack spacing={10} mt={10}>
          <Stack w={"full"} spacing={10}>
            <Heading w={"full"} size={"lg"}>
              Recorrido De Todos Nuestros Productos
            </Heading>
            <HStack>
              <Marquee>
                {list.map((data) => (
                  <SerchScreen key={data.id} {...data} />
                ))}
              </Marquee>
            </HStack>
          </Stack>
        </VStack>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const q = query(collection(db, "serchs"), limit(4), orderBy("na", "asc"));

  const el = await getDocs(q);

  const data = el.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      data,
    },
  };
}
export default Home;
