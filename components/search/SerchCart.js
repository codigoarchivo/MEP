import React, { useRef } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import {
  Button,
  Heading,
  HStack,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import SerchCartSave from "./SerchCartSave";

import Breakpoints from "../../helpers/Breakpoints";

import SerchCartActive from "./SerchCartActive";

import SerchCartModal from "./SerchCartModal";

const SerchCart = () => {
  // useRouter
  const router = useRouter();
  // selector
  const {
    activeCartSelect: active = [],
    saveCartSelect: save = [],
  } = useSelector(({ product }) => product);
  // Breakpoints
  const { bordes, full } = Breakpoints();
  // useRef
  const inc = useRef(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // incrementa y encapsula información para evitar que se actualice
  inc.current = active.reduce((total, item) => (total += item.cn * item.pr), 0);

  return (
    <>
      {/* modal compra */}
      <SerchCartModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      {/* carrito */}
      <Stack flexDirection={"row"} w={full} spacing={0}>
        {!active[0] ? (
          <Heading my={20} w={full} textAlign={"center"}>
            Carrito esta Vacio
          </Heading>
        ) : (
          <>
            <TableContainer w={"70%"} px={5} my={20} border={bordes}>
              <Table variant="striped" colorScheme="brand">
                <TableCaption>Carrito de Compras</TableCaption>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {active.map((item, key) => (
                    <SerchCartActive item={item} inc={inc} key={key} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <VStack py={20} px={5} spacing={0} w={"30%"}>
              <Stack w={full} p={3} spacing={5} border={bordes}>
                <HStack w={full}>
                  <Heading w={full} size={"md"}>
                    Total:
                  </Heading>
                  <Heading w={full}>{inc.current}$</Heading>
                </HStack>

                <Button
                  variant={"primary"}
                  w={full}
                  onClick={onOpen}
                  size={"md"}
                >
                  {"Pagar"}
                </Button>
                <Text>
                  Si quiere seguir comprando puede hacer{" "}
                  <Button
                    onClick={() => router.push("/search")}
                    textTransform={"uppercase"}
                    variant={"secondary"}
                  >
                    clik aqui
                  </Button>{" "}
                </Text>
              </Stack>
            </VStack>
          </>
        )}
      </Stack>
      {!save[0] ? (
        <></>
      ) : (
        <TableContainer variant="striped" w={full} my={10} border={bordes}>
          <Table variant="simple">
            <TableCaption>Lista de deseos</TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th textAlign={"center"}>Cantidad</Th>
                <Th>Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {save.map((item) => (
                <SerchCartSave key={item.id} {...item} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default SerchCart;
