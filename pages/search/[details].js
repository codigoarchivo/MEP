import React from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { Rating } from "react-simple-star-rating";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
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

import Calculate from "../../helpers/Calculate";
import Breakpoints from "../../helpers/Breakpoints";
import { CartIcon } from "../../helpers/IconNew";
import Toast from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import { activeProductCart } from "../../actions/product";

import SerchRat from "../../components/search/SerchRat";
import SerchMessage from "../../components/search/SerchMessage";

import { dbProducts, dbProductsById } from "../../data/dbProducts";

const Details = ({ message = [], product = {} }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // selector
  const { list } = useSelector(({ category }) => category);
  // Breakpoints
  const { content5, full, bordes } = Breakpoints();
  // values
  const { id, na, pr, im, ds, ct, cn, dt, uid, ps, pj } = product;
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

  // message obtiene rating individuales crear un array con todos los rating
  const match = message.map((item) => ({ rat: item.rat, id: item.id }));

  // crea una referencia de lista de rat
  const lisDat = match.map((item) => ({
    rat: Number(item.rat),
    nam: String(item.rat),
  }));

  // Calculate product price
  const { listRat, listRang, listRang2 } = Calculate(lisDat);

  // select product in cart
  const handleSelect = () => {
    dispatch(
      activeProductCart({
        id,
        na,
        pr,
        im,
        ds,
        ct,
        dt,
        ps,
        pj,
        uid,
        cnr: cn,
        cn: Number(input.value),
        rat: message.map((item) => item.rat.toString()),
      })
    );

    router.push("/search/cart");
  };

  return (
    <ShopLayout title={"Details"}>
      <Container maxW="container.lg" py={10}>
        <Stack flexDirection={content5} spacing={0}>
          <Box position={"relative"} w={full}>
            <Image
              src={im || "https://via.placeholder.com/450.png?text=Imagen"}
              alt={na}
              width={450}
              height={450}
              objectFit="cover"
              objectPosition="center"
              style={{
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>

          <VStack px={10} spacing={6} w={full}>
            <Heading w={full}>
              {na.charAt(0).toUpperCase() + na.slice(1)}
            </Heading>
            <HStack w={full}>
              <Text color="gray.600" fontSize={"xl"} fontWeight={"bold"}>
                {isNaN(listRang) ? "0.0" : listRang}
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
            <HStack w={full}>
              <Heading textTransform={"uppercase"} as="h3" size="sm">
                Categoria:
              </Heading>
              <Text>{listCt[0]?.na}</Text>
            </HStack>
            <Box w={full}>
              <Button
                rightIcon={<CartIcon />}
                variant={"primary"}
                onClick={handleSelect}
              >
                Añadir
              </Button>
            </Box>
          </VStack>
        </Stack>

        <HStack mt={10} border={bordes} p={5}>
          <Tabs w={"full"}>
            <TabList>
              <Tab>Detalles</Tab>
              <Tab>({message.length ? message.length : 0}) reviews</Tab>
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
                        <Heading>{isNaN(listRang) ? "0.0" : listRang}</Heading>
                        <Text>Valoración total</Text>
                      </Box>
                      <Stack w={full}>
                        {/* SerchRat */}
                        {listRat.map((item, key) => (
                          <SerchRat key={key} {...item} />
                        ))}
                      </Stack>
                    </HStack>
                  </Stack>
                  <Box>
                    {/* SerchMessage */}
                    {message.map((item) => (
                      <SerchMessage key={item.id} {...item} match={match} />
                    ))}
                  </Box>
                </>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Container>
    </ShopLayout>
  );
};

Details.propType = {
  message: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
};

export async function getStaticPaths() {
  const producto = await dbProducts("", "dbProFour");
  return {
    paths: producto.map(({ id }) => ({
      params: {
        details: id.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    // message
    const id = params.details;
    // product
    const product = await dbProductsById(id);

    const message = await dbProducts(id, "dbProThree");

    return { props: { message, product } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: { message: [], product: {} } };
  }
}

export default Details;
