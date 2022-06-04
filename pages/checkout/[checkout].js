import React, { useEffect } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import { activeProduct, saveSaleRevert } from "../../actions/product";

import CheckoutScreen from "../../components/checkout/CheckoutScreen";

import { dbUser } from "../../data/dbUser";

const Checkout = ({ product }) => {
  // dispatch
  const router = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { activeSelectCheck: check = [] } = useSelector(
    ({ product }) => product
  );
  const handleRevert = async () => {
    // revertir
    const data = await check.map((d) => {
      return {
        idP: d.id,
        uidC: a.uid,
        process: d.process,
      };
    });
    dispatch(saveSaleRevert(data));
    router.push("/");
  };

  useEffect(() => {
    if (product) {
      dispatch(activeProduct(product));
    }
  }, [dispatch, product]);

  return check.length === 0 ? (
    <ShopLayout>
      <Flex h={"full"} w={"full"} alignContent={"center"} alignItems={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      </Flex>
    </ShopLayout>
  ) : (
    <ShopLayout>
      <Container maxW={"container.xl"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              Envia el dinero a la cuenta de la tienda
            </Heading>
            <Stack w={full} flexDirection={content5} spacing={0}>
              <Box w={full} mx={2}>
                <VStack p={3} spacing={5} border={bordes}>
                  <VStack w={full} border={bordes} p={3}>
                    <Heading
                      w={full}
                      size={"sm"}
                      fontWeight={"normal"}
                      textTransform={"uppercase"}
                      px={2}
                    >
                      <Text as={"span"} fontWeight={"black"} fontSize={"small"}>
                        Lista de compras
                      </Text>{" "}
                    </Heading>
                    {check.map((item, key) => (
                      <CheckoutScreen key={key} {...item} count={(key += 1)} />
                    ))}
                  </VStack>
                  <Box w={"full"}>
                    <HStack>
                      <Text>
                        Si sientes que as cometido una equivocación puede
                        revertir haciendo{" "}
                      </Text>
                      <Button
                        onClick={handleRevert}
                        textTransform={"uppercase"}
                        variant={"secondary"}
                      >
                        clik aqui
                      </Button>{" "}
                    </HStack>

                    <Box mt={5}>
                      <Heading size={"sm"}>Nota:</Heading>{" "}
                      <Text>
                        La información se encuentra en el <b>botton resumen</b>{" "}
                        solo asi, podras notificar del pago tanto al vendedor
                        como a la tienda.
                      </Text>
                    </Box>
                  </Box>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export async function getserversideprops(context) {
  const { checkout: id } = await context.query;
  try {
    const product = await dbUser(id, "dbUserOne");

    if (!product) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Checkout;
