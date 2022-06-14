import React, { useEffect } from "react";

import { useRouter } from "next/router";

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
  activeProduct,
  closeActive,
  saveSaleRevert,
} from "../../actions/product";

import CheckoutScreen from "../../components/checkout/CheckoutScreen";

import { dbUser } from "../../data/dbUser";

import Toast from "../../helpers/Toast";

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

  useEffect(() => {
    if (product) {
      dispatch(activeProduct(product));
      dispatch(closeActive());
    }
  }, [dispatch, product]);

  const handleRevert = async () => {
    if (a === undefined) {
      router.push("/login");
    }

    // revertir
    const data = await check.map((item) => {
      return {
        uid: a.uid,
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

export async function getServerSideProps({ params }) {
  const uid = await params.uid.toString();
  try {
    const product = await dbUser(uid, "dbUserOne");

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
