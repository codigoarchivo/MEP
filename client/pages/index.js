import React, { useEffect } from "react";

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

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/layout/layout";

import Image from "next/image";

import Marquee from "react-fast-marquee";

import Breakpoints from "../helpers/Breakpoints";

import Carousel from "nuka-carousel";

import SerchScreen from "../components/search/SerchScreen";

import { listDataProduct, serchProductList } from "../actions/product";

import { db } from "../firebase/config";

import NavLink from "../helpers/Navlink";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { listDataCategory } from "../actions/category";

import Toast from "../helpers/Toast";

const Home = ({ data, dataC }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list, latestCartSelect } = useSelector(({ product }) => product);
  // Breakpoints
  const { content5, bordes } = Breakpoints();

  useEffect(() => {
    dispatch(serchProductList(data));
    dispatch(listDataProduct(data));
    dispatch(listDataCategory(dataC));
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
        <VStack spacing={10} mt={16}>
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
          {!!latestCartSelect[2] ? (
            <Stack w={"full"} spacing={10}>
              <Heading w={"full"} size={"lg"}>
                Tus Ultimas Visitas A Nuestra Tienda
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
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const qC = query(collection(db, "categories"), limit(25), orderBy("na", "asc"));
    const q = query(collection(db, "serchs"), limit(25), orderBy("na", "asc"));

    const elC = await getDocs(qC);
    const el = await getDocs(q);

    const data = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const dataC = elC.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        data,
        dataC,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default Home;
