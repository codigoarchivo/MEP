import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";

import { Box, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";

import { db } from "../../firebase/config";

import SaleScreen from "../../components/sale/SaleScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import { cheListAll } from "../../actions/checkout";
import { dbUser } from "../../data/dbUser";

const Sale = ({ dataUser }) => {
  // dispatch
  const dispatch = useDispatch();
  // useSelector
  const { history = [] } = useSelector(({ checkout }) => checkout);
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  console.log(history);

  useEffect(() => {
    if (dataUser) {
      dispatch(cheListAll(dataUser));
    } else {
      dispatch(cheListAll([]));
    }
  }, [dispatch, dataUser]);

  return (
    <ShopLayout>
      <Container maxW={"container.md"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              Historial de ventas
            </Heading>
            <Stack w={full} flexDirection={content5} spacing={0}>
              <Box w={full} mx={2}>
                <VStack p={3} spacing={5} border={bordes}>
                  <VStack w={full} py={5}>
                    <Heading
                      w={full}
                      size={"md"}
                      textTransform={"uppercase"}
                      px={2}
                      fontWeight={"black"}
                      mb={10}
                    >
                      Lista de compras
                    </Heading>

                    {history.map((item) => (
                      <SaleScreen item={item} key={item} />
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
    </ShopLayout>
  );
};

export async function getStaticProps() {
  const dA = process.env.NEXT_PUBLIC_ROL_A.toString();
  try {
    const dataUser = await dbUser(dA, "dbUserFour");

    if (!dataUser) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

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
