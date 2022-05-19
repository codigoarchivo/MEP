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

import { activeProduct, closeRevert } from "../../../actions/product";

import UserTwo from "../../../helpers/UserTwo";

import ContadorRegresivo from "../../../helpers/ContadorRegresivo";

import CheckoutScreen from "../../../components/checkout/CheckoutScreen";

const checkout = () => {
  // dispatch
  const router = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  const a = activeSelect;
  // useSelector
  const { activeSelectCheck } = useSelector(({ product }) => product);

  const handleRevert = () => {
    router.push("/");
    dispatch(closeRevert());
  };

  useEffect(async () => {
    if (a) {
      const { dataUser } = await UserTwo(a?.uid);
      if (dataUser) {
        dispatch(activeProduct(dataUser));
      }
    }
  }, [a, dispatch]);

  return !activeSelectCheck.length > 0 ? (
    <></>
  ) : (
    <Layout>
      <Box>
        {activeSelectCheck[0].lim && (
          <ContadorRegresivo lim={activeSelectCheck[0].lim} />
        )}
      </Box>
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
                        Te quedan:
                      </Text>{" "}
                      <Text
                        as={"span"}
                        id="resLimit"
                        fontWeight={"black"}
                        fontSize={"small"}
                      ></Text>
                    </Heading>
                    {activeSelectCheck.map((item, key) => (
                      <CheckoutScreen key={key} {...item} />
                    ))}
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
    </Layout>
  );
};

export default checkout;
