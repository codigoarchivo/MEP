import React from "react";

import { useRouter } from "next/router";

import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

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

import Calculate from "../../helpers/Calculate";
import Breakpoints from "../../helpers/Breakpoints";
import { CartIcon } from "../../helpers/IconNew";
import Toast from "../../helpers/Toast";

import Layout from "../../components/layout/layout";

import { activeProductCart } from "../../actions/product";

import { db } from "../../firebase/config";

import SerchRat from "../../components/search/SerchRat";
import SerchMessage from "../../components/search/SerchMessage";

const details = ({ message, product }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // selector
  const { list } = useSelector(({ category }) => category);
  // Breakpoints
  const { content5, full, bordes } = Breakpoints();
  // values
  const { id, na, pr, im, ds, ct, cn, es, dt, uid, ti } = product;
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
    nam: item.rat.toString(),
  }));

  // Calculate product price
  const { listRat, listRang, listRang2 } = Calculate(lisDat);

  // select product in cart
  const handleSelect = () => {
    const cn = Number(input.value);
    dispatch(
      activeProductCart({
        id,
        na,
        pr,
        im,
        ds,
        ct,
        cn,
        es,
        dt,
        uid,
        ti,
        rat: message.map((item) => item.rat.toString()),
      })
    );

    router.push("/search/cart");
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
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    // message
    const id = context.query.details.toString();

    const q = query(collection(db, "serchs", id, "messages"));

    const el = await getDocs(q);

    const message = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

     //  product
     const docRef = doc(db, "serchs", id);

     const docSnap = await getDoc(docRef);
 
     const product = {
       id: docSnap.id,
       ...docSnap.data(),
     };

    return { props: { message, product } };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: { message: [], product: {} } };
  }
}

export default details;
