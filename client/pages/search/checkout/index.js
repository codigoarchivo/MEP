import React, { useEffect, useRef } from "react";

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
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../components/layout/layout";

import Breakpoints from "../../../helpers/Breakpoints";

import {
  CheckCircleIcon,
  CheckIcon,
  ExternalLinkIcon,
  LockIcon,
  UnlockIcon,
} from "@chakra-ui/icons";

import { CartList, WhatsAppIcon } from "../../../helpers/IconNew";

import { activeProduct, closeRevert } from "../../../actions/product";

import UserTwo from "../../../helpers/UserTwo";

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
  // useRef
  const cat = useRef(0);
  // useRef
  const resumen = useRef(0);

  cat.current = activeSelectCheck.reduce(
    (total, item) => total + Number(item.product.cn),
    0
  );
  resumen.current = activeSelectCheck.reduce(
    (total, item) =>
      (total += Number(item.product.cn) * Number(item.product.pr)),
    0
  );

  const handleRevert = () => {
    router.push("/");
    dispatch(closeRevert());
  };

  useEffect(async () => {
    const { dataUser } = await UserTwo(a?.uid);
    if (dataUser) {
      dispatch(activeProduct(dataUser));
    }
  }, []);

  const handleSelect = () => {
    router.push({
      pathname: "/search/checkout/rate",
      query: {
        id: item.product.id,
        rat: item.product.rat,
        li: activeSelectCheck.length,
      },
    });
  };
  return !activeSelectCheck.length > 0 ? (
    <></>
  ) : (
    <Layout>
      <Container maxW={"container.lg"}>
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
                        key={key}
                        w={full}
                        justifyContent={"space-between"}
                        borderBottom={bordes}
                        p={2}
                      >
                        <HStack spacing={"5"}>
                          <Button
                            backgroundColor={"grey.100"}
                            leftIcon={<CartList h={5} w={5} />}
                            variant={"primary"}
                            size={"xs"}
                            border={bordes}
                            w={"min-content"}
                            onClick={handleSelect}
                            disabled={item.process ? true : false}
                          >
                            resumen
                          </Button>
                          <Button
                            backgroundColor={"grey.100"}
                            variant={"primary"}
                            size={"xs"}
                            border={bordes}
                            w={"min-content"}
                            onClick={handleSelect}
                            disabled={item.process ? false : true}
                          >
                            Calificar
                          </Button>
                        </HStack>
                        <HStack spacing={"5"}>
                          <Text>te quedan:2dias</Text>
                          <Tag
                            size={"md"}
                            variant="outline"
                            colorScheme={item.process ? "green" : "blue"}
                          >
                            <TagLabel>
                              {item.process ? "Pagado" : "Proceso"}
                            </TagLabel>
                            <TagRightIcon
                              as={item.process ? UnlockIcon : LockIcon}
                            />
                          </Tag>
                        </HStack>
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
