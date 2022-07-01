import React, { useMemo, useRef } from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

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

import es from "../../translations/es";
import en from "../../translations/en";

const SerchCart = ({ active, save }) => {
  // useRouter
  const { locale, push } = useRouter();
  // Breakpoints
  const { bordes, full } = Breakpoints();
  // useRef
  const inc = useRef(0);
  // useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // incrementa y encapsula información para evitar que se actualice
  inc.current = useMemo(
    () => active.reduce((total, item) => (total += item.cn * item.pr), 0),
    [active]
  );

  return (
    <>
      {/* carrito */}
      <Stack flexDirection={"row"} w={full} spacing={0}>
        {!active[0] ? (
          <Heading my={20} w={full} textAlign={"center"}>
            {locale === "en" ? en.empty : es.empty}
          </Heading>
        ) : (
          <>
            <TableContainer w={"70%"} px={5} my={20} border={bordes}>
              <Table variant="striped" colorScheme="brand">
                <TableCaption>
                  {locale === "en" ? en.cart.cA : es.cart.cA}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th isNumeric>{locale === "en" ? en.action : es.action}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {active.map((item, key) => (
                    <SerchCartActive
                      item={item}
                      inc={inc}
                      key={key}
                      name={locale === "en" ? en.name : es.name}
                      description={
                        locale === "en" ? en.description : es.description
                      }
                      price={locale === "en" ? en.price : es.price}
                      quantity={locale === "en" ? en.quantity : es.quantity}
                      category={locale === "en" ? en.major.mF : es.major.mF}
                      guy={locale === "en" ? en.guy : es.guy}
                      subtotal={locale === "en" ? en.subtotal : es.subtotal}
                      removed={locale === "en" ? en.removed : es.removed}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <VStack py={20} px={5} spacing={0} w={"30%"}>
              <Stack w={full} p={3} spacing={5} border={bordes}>
                <HStack w={full} justifyContent={"space-between"}>
                  <Heading size={"md"}>Total:</Heading>
                  <Heading>{inc.current}$</Heading>
                </HStack>

                <Button
                  variant={"primary"}
                  w={full}
                  onClick={onOpen}
                  size={"md"}
                >
                  {locale === "en" ? en.cart.cB : es.cart.cB}
                </Button>
                <Text w={full}>
                  {locale === "en" ? en.cart.cC : es.cart.cC}{" "}
                  <Button
                    onClick={() => push("/search")}
                    textTransform={"uppercase"}
                    variant={"secondary"}
                    px={0}
                    size={"sm"}
                  >
                    {locale === "en" ? en.clickHere : es.clickHere}
                  </Button>{" "}
                </Text>
              </Stack>
            </VStack>
            {/* modal compra */}
            <SerchCartModal
              isOpen={isOpen}
              onClose={onClose}
              cD={locale === "en" ? en.cart.cD : es.cart.cD}
              cE={locale === "en" ? en.cart.cE : es.cart.cE}
              cF={locale === "en" ? en.cart.cF : en.cart.cF}
              close={locale === "en" ? en.close : es.close}
              toBuy={locale === "en" ? en.toBuy : es.toBuy}
              del={locale === "en" ? en.delete : en.delete}
              push={push}
            />
          </>
        )}
      </Stack>
      {!save[0] ? (
        <></>
      ) : (
        <TableContainer variant="striped" w={full} my={10} border={bordes}>
          <Table variant="simple">
            <TableCaption>
              {locale === "en" ? en.cart.cI : en.cart.cI}
            </TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th textAlign={"center"}>
                  {locale === "en" ? en.quantity : en.quantity}
                </Th>
                <Th>Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {save.map((item) => (
                <SerchCartSave
                  key={item.id}
                  {...item}
                  name={locale === "en" ? en.name : en.name}
                  price={locale === "en" ? en.price : en.price}
                  available={locale === "en" ? en.available : en.available}
                  add={locale === "en" ? en.add : en.add}
                  del={locale === "en" ? en.delete : en.delete}
                  err={locale === "en" ? en.error : es.error}
                  added={locale === "en" ? en.cart.cG : es.cart.cG}
                  already={locale === "en" ? en.cart.cH : es.cart.cH}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

SerchCart.propTypes = {
  active: PropTypes.array,
  save: PropTypes.array,
};

export default SerchCart;
