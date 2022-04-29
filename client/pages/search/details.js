import React from "react";

import { useRouter } from "next/router";

import { collection, getDocs, query } from "firebase/firestore";

import { Rating } from "react-simple-star-rating";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
import SerchRat from "../../components/search/SerchRat";
import SerchMessage from "../../components/search/SerchMessage";

const Details = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // selector
  const { list } = useSelector(({ category }) => category);
  // Breakpoints
  const { content5, full, bordes } = Breakpoints();
  // activeSelectQ
  const activeSelectQ = router.query;
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

  // query ref el nombre propiedad x se muestra una vez (String) pero a ver mas de la misma x propiedad (Array)
  const rat =
    typeof router.query.rat === "string"
      ? new Array(router.query.rat)
      : router.query.rat;
  // crea una referencia de lista de rat
  const lisRat = rat.map((item) => ({
    rat: Number(item),
    nam: item,
  }));

  // select product in cart
  const handleSelect = () => {
    const cn = Number(input.value);
    dispatch(activeProductCart({ id, na, pr, im, ds, ct, cn, es, dt, rat }));

    router.push("/search/cart");
  };

  // Calculate product price
  const { listRat, listRang, listRang2 } = Calculate(lisRat);

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
                <>
                  <Stack w={"full"} mb={10} border={bordes}>
                    <HStack p={5} w={full}>
                      <Box p={5} textAlign={"center"}>
                        <Heading>{listRang}</Heading>
                        <Text>Valoración total</Text>
                      </Box>
                      <Stack w={full}>
                        {/* SerchRat */}
                        {listRat.map((item) => (
                          <SerchRat key={item.est} {...item} />
                        ))}
                      </Stack>
                    </HStack>
                  </Stack>
                  <Box>
                    {/* SerchMessage */}
                    {data.map((item) => (
                      <SerchMessage key={item.id} {...item} />
                    ))}
                  </Box>
                </>
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
