import React, { useEffect } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../components/layout/layout";

import Breakpoints from "../../../helpers/Breakpoints";

import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import { WhatsAppIcon } from "../../../helpers/IconNew";

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
            <Stack
              w={full}
              flexDirection={content5}
              spacing={0}
              justifyContent={"space-around"}
            >
              <VStack w={"min-content"} border={bordes} p={5} mx={2}>
                <Heading w={full} size={"sm"}>
                  Información de la tienda
                </Heading>
                <HStack w={full}>
                  <Heading size={"sm"}>Telefono:</Heading>
                  <Text>+1 973 510 8452</Text>
                </HStack>
                <Stack w={full} spacing={5}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="brand.700" />
                      Transferencia por Zelle
                    </ListItem>
                  </List>
                  <HStack>
                    <Heading size={"sm"}>Nombre:</Heading>
                    <Text>Edgar Marcano</Text>
                  </HStack>
                  <HStack>
                    <Heading size={"sm"}>Correo:</Heading>
                    <Text>ehms1975@gmail.com</Text>
                  </HStack>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="brand.700" />
                      Desde la aplicación móvil
                    </ListItem>
                  </List>
                  <HStack>
                    <Heading size={"sm"}>Información:</Heading>
                    <Link
                      href="https://www.bankofamerica.com/online-banking/mobile-and-online-banking-features/money-transfer/es/#:~:text=Seleccione%20Transferir%20%7C%20Enviar%20y%20despu%C3%A9s,transferencia%20y%20luego%20toque%20Continuar."
                      isExternal
                    >
                      Ir a<ExternalLinkIcon mx="2px" />
                    </Link>
                  </HStack>
                  <HStack>
                    <Heading size={"sm"}>Nombre:</Heading>
                    <Text>Edgar Marcano</Text>
                  </HStack>
                  <HStack>
                    <Heading size={"sm"}>N° Cuenta:</Heading>
                    <Text>381053465609</Text>
                  </HStack>
                </Stack>
                <HStack w={full}>
                  <Heading size={"sm"}>WhatsApp:</Heading>
                  <Link
                    href="https://wa.me/19735108452?text=Hola%20Edgar%20Marcano%20voy%20a%20"
                    isExternal
                  >
                    Ir a<WhatsAppIcon mx="2px" />
                  </Link>
                </HStack>
              </VStack>

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
