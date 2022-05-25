import React, { useEffect } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../../../components/layout/ShopLayout";
import Breakpoints from "../../../helpers/Breakpoints";
import { activeProduct } from "../../../actions/product";
import UserTwo from "../../../helpers/UserTwo";
import CheckoutScreen from "../../../components/checkout/CheckoutScreen";
import Toast from "../../../helpers/Toast";

const Buy = ({ dataUser }) => {
  // dispatch
  const router = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();
  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);
  // useSelector
  const { activeSelectCheck } = useSelector(({ product }) => product);

  const handleRevert = () => {
    router.push("/");
    dispatch(closeRevert());
  };

  // useEffect(async () => {
  //   if (dataUser) {
  //     dispatch(activeProduct(dataUser));
  //   }
  // }, [dispatch]);

  return (
    <ShopLayout>
      <Container maxW={"container.xl"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              Historial de ventas
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
                      Historial de ventas
                    </Heading>
                    {/* {activeSelectCheck.map((item, key) => (
                      <CheckoutScreen key={key} {...item} />
                    ))} */}
                  </VStack>
                  <Box>
                    <Text>
                      Si sientes que as cometido una equivocación puede revertir
                      haciendo{" "}
                    </Text>
                    <Button
                      onClick={handleRevert}
                      textTransform={"uppercase"}
                      variant={"secondary"}
                    >
                      clik aqui
                    </Button>{" "}
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

export async function getServerSideProps(context) {
  const { buy } = await context.query;
  try {
    const { dataUser } = await UserTwo(buy, "buy");
    return {
      props: {
        dataUser : null,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}
export default Buy;
