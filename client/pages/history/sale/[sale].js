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

import Layout from "../../../components/layout/layout";
import Breakpoints from "../../../helpers/Breakpoints";
import { activeProduct } from "../../../actions/product";
import UserTwo from "../../../helpers/UserTwo";
import CheckoutScreen from "../../../components/checkout/CheckoutScreen";
import Toast from "../../../helpers/Toast";
import SaleScreen from "../../../components/sale/SaleScreen";

const Sale = ({ dataUser }) => {
  // dispatch
  const router = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

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
    <Layout>
      <Container maxW={"container.lg"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              Historial de ventas
            </Heading>
            <Stack w={full} flexDirection={content5} spacing={0}>
              <Box w={full} mx={2}>
                <VStack p={3} spacing={5} border={bordes}>
                  <VStack w={full} border={bordes} p={3}>
                    {dataUser.map((item, key) => (
                      <SaleScreen key={key} {...item} />
                    ))}
                  </VStack>

                  <Box mt={5} w={"full"}>
                    <Heading display={"inline"} size={"sm"}>
                      Nota:
                    </Heading>{" "}
                    <Text display={"inline"}>
                      La información se encuentra en el <b>botton resumen</b>{" "}
                      solo asi, podras notificar del pago tanto al vendedor como
                      a la tienda.
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Stack>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { sale } = await context.query;
  try {
    const { dataUser } = await UserTwo(sale.toString(), "sales");
    return {
      props: {
        dataUser,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}
export default Sale;
