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

import ShopLayout from "../../../components/layout/ShopLayout";

import Breakpoints from "../../../helpers/Breakpoints";

import { activeProduct, saveSaleRevert } from "../../../actions/product";

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
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { activeSelectCheck: check = [] } = useSelector(
    ({ product }) => product
  );

  const handleRevert = () => {
    // revertir
    const data = check.map(({ id }) => {
      return {
        idP: id,
        uidC: a.uid,
      };
    });
    router.push("/");
    dispatch(saveSaleRevert(data));
  };

  useEffect(async () => {
    if (check.length === 0 && a?.uid) {
      const { dataUser } = await UserTwo(a?.uid, "buys");
      dispatch(activeProduct(dataUser));
    } else {
      dispatch(activeProduct(check));
    }
  }, [dispatch, activeProduct]);

  return check.length === 0 ? (
    <></>
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

export default checkout;
