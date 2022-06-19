import React, { useEffect } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

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

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import {
  activeProductList,
  closeActive,
  closeProductDetails,
  saveSaleRevert,
} from "../../actions/product";

import CheckoutScreen from "../../components/checkout/CheckoutScreen";

import { dbUser } from "../../data/dbUser";

import Toast from "../../helpers/Toast";

const Checkout = ({ product = [] }) => {
  // useSelector
  const { activeSelectCheck: check = [] } = useSelector(
    ({ product }) => product
  );
  // dispatch
  const router = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  useEffect(() => {
    if (product) {
      dispatch(activeProductList(product));
    }
  }, [dispatch, product]);

  useEffect(() => {
    // path: /cart
    dispatch(closeActive());
  }, [dispatch]);
  
  useEffect(() => {
    // path: /details
    dispatch(closeProductDetails());
  }, [dispatch]);

  const handleRevert = async () => {
    // revertir
    const data = await check.map((item) => {
      return {
        idP: item.id,
        process: item.process,
        cnr: item.product.cnr,
        cn: item.product.cn,
        id: item.product.id,
      };
    });

    dispatch(saveSaleRevert(data));

    router.push("/");
  };

  return (
    <ShopLayout title={"Tus Compras"}>
      <Container maxW={"container.lg"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              Envia el dinero a la cuenta de la tienda
            </Heading>
            <Stack w={full} flexDirection={content5} spacing={0}>
              <Box w={full} mx={2}>
                <VStack spacing={5} border={bordes} p={10} boxShadow={"lg"}>
                  <VStack w={full} py={5}>
                    <Heading
                      w={full}
                      size={"md"}
                      textTransform={"uppercase"}
                      px={2}
                      fontWeight={"black"}
                      mb={10}
                    >
                      {!!check
                        ? "No hay compras asociadas"
                        : "Lista de compras"}
                    </Heading>
                    {check.map((item, key) => (
                      <CheckoutScreen key={key} {...item} count={(key += 1)} />
                    ))}
                  </VStack>
                  <Box w={"full"}>
                    {!check && (
                      <>
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
                            La información se encuentra en el{" "}
                            <b>botton resumen</b> solo asi, podras notificar del
                            pago tanto al vendedor como a la tienda.
                          </Text>
                        </Box>
                      </>
                    )}
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

Checkout.propTypes = {
  product: PropTypes.array,
};

export async function getServerSideProps({ query }) {
  const q = await query.q.toString();
  try {
    const product = await dbUser(q, "dbUserFour");

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
