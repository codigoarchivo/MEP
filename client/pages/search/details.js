import React from "react";

import { useRouter } from "next/router";

import { StarIcon } from "@chakra-ui/icons";

import { collection, getDocs, query } from "firebase/firestore";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
  Avatar,
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

const Details = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // selector
  const { list } = useSelector(({ category }) => category);
  // Breakpoints
  const { content5, full, content6 } = Breakpoints();

  const activeSelect = router.query;
  // values
  const { id, na, pr, im, ds, ct, cn, es, dt } = activeSelect;
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
  console.log(data);
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
            <Box w={"full"} display="flex" mt={2} alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "brand.800" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {property.reviewCount} reviews
              </Box>
            </Box>
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
          <Tabs>
            <TabList>
              <Tab>Detalles</Tab>
              <Tab>Valoraciones</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>{dt}</Text>
              </TabPanel>
              <TabPanel>
                <Stack flexDirection={content6} spacing={0}>
                  <VStack>
                    <Avatar
                      size="md"
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </VStack>
                  <HStack>
                    <Heading size={"sm"}>Dan Abrahmov</Heading>
                  </HStack>
                </Stack>
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
