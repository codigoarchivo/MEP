import React, { useRef } from "react";

import { useRouter } from "next/router";

import { DragHandleIcon, StarIcon } from "@chakra-ui/icons";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";

import { collection, getDocs, query } from "firebase/firestore";

import { Rating } from "react-simple-star-rating";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  Progress,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import { CartIcon } from "../../helpers/IconNew";
import Toast from "../../helpers/Toast";

import Layout from "../../components/layout/layout";

import { activeProductCart } from "../../actions/product";

import { db } from "../../firebase/config";

import Calculate from "../../helpers/Calculate";

const Details = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // selector
  const { list } = useSelector(({ category }) => category);
  // Breakpoints
  const { content5, full, content6, bordes } = Breakpoints();
  // activeSelectQ
  const activeSelectQ = router.query;
  // useRef
  const lis = useRef({ rat: 0 });
  // values
  const { id, na, pr, im, ds, ct, cn, es, dt } = activeSelectQ;
  // list Category
  const listCt = list.filter((item) => item.id === ct);
  // Incremen and Decrement
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: cn,
  });
  // inc
  const inc = getIncrementButtonProps();
  // dec
  const dec = getDecrementButtonProps();
  // input
  const input = getInputProps({ isReadOnly: true });
  // select
  const handleSelect = () => {
    const cn = Number(input.value);
    dispatch(activeProductCart({ id, na, pr, im, cn }));

    router.push("/search/cart");
  };

  const property = {
    reviewCount: 34,
    rating: 4,
  };

  lis.current.rat = data.map((item) => ({
    rat: item.rat,
    nam: item.rat.toString(),
  }));

  // Calculate
  const { listRat, listRang, listRang2 } = Calculate(lis.current.rat);

  const handleRating = () => {
    // dispatch(checkoutadd());
    router.push({
      pathname: "/search/checkout/rate",
      query: {
        id,
        rat: 60,
        com: "hola",
      },
    });
  };
  return (
    <Layout>
      <Container maxW="container.lg">
        <Stack flexDirection={content5}>
          <VStack>
            {im && (
              <AspectRatio w="500px" h={"auto"} position={"relative"}>
                <Image
                  src={im}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="contain"
                />
              </AspectRatio>
            )}
          </VStack>

          <VStack p={5} spacing={4}>
            <Heading>{na}</Heading>
            <HStack w={full}>
              <Text color="gray.600" fontSize={"xl"} fontWeight={"bold"}>
                {isNaN(listRang) ? "( 0 )" : listRang}
              </Text>{" "}
              <Box p={0.5}>
                <Rating
                  size={25}
                  ratingValue={isNaN(listRang) ? 0 : listRang2}
                  readonly={true}
                />
              </Box>
            </HStack>
            <Box w={full}>
              <Badge colorScheme="green">En stock ({cn})</Badge>
            </Box>
            <Heading w={full} as="h1" size="md" fontWeight={"normal"}>
              Precio: ${pr * input.value}
            </Heading>
            <Text w={full}>{ds}</Text>
            <Box w={full}>
              <HStack maxW="180px">
                <Button fontSize={20} variant={"primary"} {...dec}>
                  -
                </Button>
                <Input {...input} />
                <Button fontSize={20} variant={"primary"} {...inc}>
                  +
                </Button>
              </HStack>
            </Box>
            <Box w={full}>
              <Button
                rightIcon={<CartIcon />}
                variant={"primary"}
                onClick={handleSelect}
              >
                Añadir
              </Button>
            </Box>
            <HStack w={full}>
              <Heading textTransform={"uppercase"} as="h3" size="sm">
                Categoria:
              </Heading>
              <Text>{listCt[0]?.na}</Text>
            </HStack>
          </VStack>
        </Stack>

        <HStack>
          <Tabs w={"full"}>
            <TabList>
              <Tab>Detalles</Tab>
              <Tab>({data.length ? data.length : 0}) reviews</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>{dt}</Text>
              </TabPanel>
              <TabPanel>
                {listRat.length > 0 ? (
                  <>
                    <Stack w={"full"} mb={10} border={bordes}>
                      <HStack p={5} w={full}>
                        <Box p={5} textAlign={"center"}>
                          <Heading>{listRang}</Heading>
                          <Text>Valoración total</Text>
                        </Box>
                        <Stack w={full}>
                          {listRat.map((item, key) => (
                            <HStack p={0.5} key={key}>
                              <Box p={0.5}>
                                <Heading w={6} size={"sm"}>
                                  {item.nam}
                                </Heading>
                              </Box>
                              <Progress
                                w={full}
                                colorScheme="yellow"
                                size="sm"
                                value={item.rat}
                              />
                              <Box p={0.5}>{item.per}</Box>
                              <Rating
                                size={25}
                                ratingValue={item.est ? item.est : 0}
                                readonly={true}
                              />
                              <Box p={0.5}>
                                <Heading size={"xs"}>{item.rat}%</Heading>
                              </Box>
                            </HStack>
                          ))}
                        </Stack>
                      </HStack>
                    </Stack>
                    <Box>
                      {data.map((item) => (
                        <>
                          <Stack
                            key={item.nam}
                            flexDirection={content6}
                            spacing={0}
                            p={5}
                          >
                            <VStack mx={4} h={"full"}>
                              {!item.pho ? (
                                <Avatar size="md" name={item.nam} />
                              ) : (
                                <AspectRatio
                                  ratio={16 / 9}
                                  w={50}
                                  h={50}
                                  position={"relative"}
                                >
                                  <Image
                                    src={item.pho}
                                    alt="Perfil"
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </AspectRatio>
                              )}
                            </VStack>
                            <VStack mx={4} w={"full"}>
                              <HStack
                                w={"full"}
                                justifyContent={"space-between"}
                              >
                                <Heading size={"md"}>{item.nam}</Heading>
                                {item.uid === activeSelect?.uid ? (
                                  <Tooltip
                                    hasArrow
                                    label="Editar Reseñas"
                                    bg="brand.700"
                                    color={"Background.900"}
                                  >
                                    <Button
                                      variant={"secondary"}
                                      onClick={handleRating}
                                    >
                                      <DragHandleIcon />
                                    </Button>
                                  </Tooltip>
                                ) : (
                                  ""
                                )}
                              </HStack>

                              <HStack w={"full"}>
                                <Box>
                                  <Rating
                                    size={25}
                                    ratingValue={item.rat}
                                    readonly={true}
                                  />
                                </Box>
                                <Box as="span" color="gray.600" fontSize="sm">
                                  hace{" "}
                                  {formatDistanceToNow(item.cre, {
                                    locale: localEs,
                                  })}
                                </Box>
                              </HStack>
                              <Text w={"full"}>{item.com}</Text>
                            </VStack>
                          </Stack>
                          <Divider w={"full"} mt={5} borderBottom={bordes} />
                        </>
                      ))}
                    </Box>
                  </>
                ) : (
                  <Text>No hay reviews</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    const id = context.query.id.toString();

    const q = query(collection(db, "serchs", id, "messages"));

    const el = await getDocs(q);

    const data = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { props: { data } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default Details;
