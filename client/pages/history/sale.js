import React, { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

import { Box, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";

import { db } from "../../firebase/config";

import SaleScreen from "../../components/sale/SaleScreen";

import Layout from "../../components/layout/layout";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

const Sale = ({ dataUser }) => {
  const [dataList, setDataList] = useState([]);
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  useEffect(() => {
    if (dataUser) {
      setDataList(dataUser);
    } else {
      setDataList([]);
    }
  }, [dataUser]);

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
                    {dataList.map((item, key) => (
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

export async function getStaticProps() {
  const dA = process.env.NEXT_PUBLIC_ROL_A;
  try {
    const docRef = collection(db, "users", dA, "sales");

    const q = query(docRef, where("close", "==", false));

    const el = await getDocs(q);

    const dataUser = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        dataUser: JSON.parse(JSON.stringify(dataUser)),
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
