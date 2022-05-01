import React, { useRef } from "react";

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

import { CartList, WhatsAppIcon } from "../../../helpers/IconNew";

import { closeRevert } from "../../../actions/product";

import NavLink from "../../../helpers/Navlink";

const checkout = () => {
  // dispatch
  const router = useRouter();
  // dispatch
  const product = useRef([]);
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full } = Breakpoints();
  // useSelector
  const { activeSelectCheck } = useSelector(({ product }) => product);
  // useRef
  const cat = useRef(0);
  // useRef
  const resumen = useRef(0);

  cat.current = activeSelectCheck.reduce(
    (total, item) => total + Number(item.cn),
    0
  );
  resumen.current = activeSelectCheck.reduce(
    (total, item) => (total += Number(item.cn) * Number(item.pr)),
    0
  );

  const handleRevert = () => {
    router.push("/");
    dispatch(closeRevert());
  };
  // product
  // activeSelectCheck.map((item) => product.current.push(item.id));

  return !activeSelectCheck.length > 0 ? (
    <></>
  ) : (
    <Layout>
      <Container maxW={"container.xl"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={"70%"} spacing={5}>
            <Heading w={full}>Pagar</Heading>
            <HStack w={full}>
              <Heading size={"sm"}>Paso 1:</Heading>
              <Text>
                Comunicarse con el vendedor para confirmar la compra y el pago:
              </Text>
            </HStack>
            <List spacing={3} w={full}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.700" />
                Medios de comunicación
              </ListItem>
            </List>
            <HStack w={full}>
              <Heading size={"sm"}>Telefono:</Heading>
              <Text>+1 973 510 8452</Text>
            </HStack>
            <HStack w={full}>
              <Heading size={"sm"}>Correo:</Heading>
              <Text>ehms1975@gmail.com</Text>
            </HStack>
            <HStack w={full}>
              <Heading size={"sm"}>WhatsApp:</Heading>
              <Link
                href="https://wa.me/19735108452?text=Hola%20Edgar%20Marcano%20voy%20a%20"
                isExternal
              >
                Ir a<WhatsAppIcon mx="2px" />
              </Link>
            </HStack>

            <HStack w={full}>
              <Heading size={"sm"}>Paso 2:</Heading>
              <Text>
                Para realizar el pago lo puede hacer mediante esto metodos de
                pagos:
              </Text>
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
              <Heading size={"sm"}>Paso 3:</Heading>
              <Text>
                Una vez corfirmado pago y confirmado el envio, puede calificar
                el producto o servicio en la plataforma:
              </Text>
            </HStack>
            <List w={full}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.700" />
                Calificar al vendedor
              </ListItem>
            </List>
            <Box w={full}>
              <HStack>
                <Heading size={"sm"}>Calificar:</Heading>
                <Button variant={"primary"}>Enviar</Button>
              </HStack>
            </Box>
          </VStack>
          <VStack w={"30%"}>
            <Stack w={full} p={3} spacing={5} border={bordes}>
              <VStack w={full} border={bordes} p={2}>
                <Heading
                  w={full}
                  size={"lg"}
                  fontWeight={"normal"}
                  textTransform={"uppercase"}
                >
                  Resumen
                </Heading>
                {activeSelectCheck.map((item, key) => (
                  <HStack
                    key={item.id}
                    w={full}
                    justifyContent={"space-between"}
                  >
                    <Heading size={"sm"}>
                      <Box as={CartList} w={5} h={5} />{" "}
                      {key ? (key += 1) : (key = 1)}:
                    </Heading>
                    <Text size={"sm"}>{item.na}</Text>
                  </HStack>
                ))}
                <HStack w={full} justifyContent={"space-between"}>
                  <Heading size={"sm"}>Cantidad Total:</Heading>
                  <Text size={"sm"}>{cat.current}</Text>
                </HStack>
              </VStack>

              <HStack justifyContent={"space-between"}>
                <Heading size={"md"}>Total a Transferir:</Heading>
                <Text size={"md"}>{resumen.current}$</Text>
              </HStack>
              {activeSelectCheck.map((item, key) => (
                <NavLink
                  leftIcon={<CartList w={5} h={5} />}
                  key={item.id}
                  name={`${key ? (key += 1) : (key = 1)} Calificar`}
                  href={{
                    pathname: "/search/checkout/rate",
                    query: {
                      id: item.id,
                      na: item.na,
                      pr: item.pr,
                      im: item.im,
                      cn: item.cn,
                      ct: item.ct,
                      ds: item.ds,
                      dt: item.dt,
                      es: item.es,
                      rat: item.rat,
                      li: activeSelectCheck.length,
                    },
                  }}
                  variant={"primary"}
                  w={full}
                />
              ))}
    
              <Text>
                Si sientes que as cometido una equivocación puede revertir
                haciendo{" "}
                <Button
                  onClick={handleRevert}
                  textTransform={"uppercase"}
                  variant={"secondary"}
                >
                  clik aqui
                </Button>{" "}
              </Text>
            </Stack>
          </VStack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default checkout;
