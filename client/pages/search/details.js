import React from "react";

import { useRouter } from "next/router";

import { StarIcon } from "@chakra-ui/icons";

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
  useToast,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import { CartIcon } from "../../helpers/IconNew";

import Layout from "../../components/layout/layout";

import { activeProductCart } from "../../actions/product";

const Details = () => {
  // toast
  const toast = useToast();
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // selector
  const { activeCartSelect, activeSelect } = useSelector(
    ({ product }) => product
  );
  // Breakpoints
  const { content5, full } = Breakpoints();
  // values
  const { id, na, pr, im, ds, ct, cn, es, dt } = activeSelect;
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
    // activeCartSelect
    const match = activeCartSelect.map((item) => item.id).includes(id);
    if (match) {
      return toast({
        description: "Producto ya esta en el carrito",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      const total = pr * input.value;
      const cantidad = input.value;
      dispatch(activeProductCart({ id, na, pr, im, cantidad, total }));

      router.push("/search/cart");
    }
  };

  const property = {
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Layout>
      <Container maxW="container.lg">
        <Stack flexDirection={content5}>
          <VStack>
            <AspectRatio w="500px" h={"auto"} position={"relative"}>
              <Image
                src={im}
                alt="Picture of the author"
                layout="fill"
                objectFit="contain"
              />
            </AspectRatio>
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
              <Text>{ct?.na}</Text>
            </HStack>
          </VStack>
        </Stack>
        <HStack>
          <Tabs>
            <TabList>
              <Tab>Detalles</Tab>
              <Tab>Especificación</Tab>
              <Tab>Reviews(0)</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>{dt}</Text>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Container>
    </Layout>
  );
};
export default Details;
