import React from "react";

import {
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

import Layout from "../../components/layout/layout";

import Breakpoints from "../../helpers/Breakpoints";
import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";

const checkout = () => {
  // Breakpoints
  const { bordes, full } = Breakpoints();
  return (
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
              <Heading size={"sm"}>Telegram:</Heading>

              <Link href="@edgarspendulun" isExternal>
                Ir a<ExternalLinkIcon mx="2px" />
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
                <HStack w={full} justifyContent={"space-between"}>
                  <Heading size={"sm"}>Producto 1:</Heading>
                  <Text size={"sm"}>Camisa</Text>
                </HStack>
                <HStack w={full} justifyContent={"space-between"}>
                  <Heading size={"sm"}>Cantidad Total:</Heading>
                  <Text size={"sm"}>5</Text>
                </HStack>
              </VStack>

              <HStack justifyContent={"space-between"}>
                <Heading size={"md"}>Total:</Heading>
                <Text size={"md"}>50$</Text>
              </HStack>
              <Button variant={"primary"} w={full}>
                Calificar
              </Button>
            </Stack>
          </VStack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default checkout;
