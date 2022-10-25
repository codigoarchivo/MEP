import React, { useMemo, useRef } from "react";

import PropTypes from "prop-types";

import { useSelector } from "react-redux";

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

import { SerchCartSave } from "./SerchCartSave";

import { Breakpoints } from "../../helpers/Breakpoints";

import { SerchCartActive } from "./SerchCartActive";

import { SerchCartModal } from "./SerchCartModal";

import { ModeColor } from "../../helpers/ModeColor";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const SerchCart = ({ active, save }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useRouter
  const { locale, push, replace, asPath } = useRouter();
  // Breakpoints
  const { bordes, full, content7 } = Breakpoints();
  // useRef
  const inc = useRef(0);
  // useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // incrementa y encapsula información para evitar que se actualice
  inc.current = useMemo(
    () => active.reduce((total, item) => (total += item.cn * item.pr), 0),
    [active]
  );

  const { photoURL, displayName, uid } = a;

  const handlecartActive = () => {
    if ([photoURL, displayName, uid].includes(undefined)) {
     return replace(`/auth?d=${asPath}`);
    } else {
      onOpen();
    }
  };

  const { modelF } = ModeColor();

  return (
    <>
      {/* carrito */}
      <Stack
        flexDirection={content7}
        w={full}
        spacing={0}
        alignItems={{ base: "center", lg: "start" }}
      >
        {!active[0] ? (
          <Heading my={20} w={full} textAlign={"center"}>
            {locale === "en-US" ? en.empty : es.empty}
          </Heading>
        ) : (
          <>
            <TableContainer
              mr={{ base: 0, lg: 5 }}
              mb={{ base: 5, lg: 0 }}
              w={{ base: "100%", lg: "70%" }}
              border={bordes}
            >
              <Table colorScheme="brand">
                <TableCaption color={modelF}>
                  {locale === "en-US" ? en.cart.cA : es.cart.cA}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th color={modelF} isNumeric>
                      {locale === "en-US" ? en.action : es.action}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {active.map((item, key) => (
                    <SerchCartActive
                      item={item}
                      inc={inc}
                      key={key}
                      locale={locale}
                      en={en}
                      es={es}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <VStack w={{ base: "100%", md: "70%", lg: "30%" }} spacing={0}>
              <Stack w={full} p={3} spacing={5} border={bordes}>
                <HStack w={full} justifyContent={"space-between"}>
                  <Heading size={"md"}>Total:</Heading>
                  <Heading>{inc.current}$</Heading>
                </HStack>

                <Button
                  variant={"primary"}
                  w={full}
                  onClick={handlecartActive}
                  size={"md"}
                >
                  {locale === "en-US" ? en.cart.cB : es.cart.cB}
                </Button>
                <Text w={full}>
                  {locale === "en-US" ? en.cart.cC : es.cart.cC}{" "}
                  <Button
                    onClick={() => push("/search")}
                    textTransform={"uppercase"}
                    variant={"primary"}
                    size={"sm"}
                  >
                    {locale === "en-US" ? en.clickHere : es.clickHere}
                  </Button>{" "}
                </Text>
              </Stack>
            </VStack>
            {/* modal compra */}
            <SerchCartModal
              isOpen={isOpen}
              onClose={onClose}
              locale={locale}
              en={en}
              es={es}
              close={locale === "en-US" ? en.close : es.close}
              toBuy={locale === "en-US" ? en.toBuy : es.toBuy}
              del={locale === "en-US" ? en.delete : en.delete}
              push={push}
            />
          </>
        )}
      </Stack>
      {!save[0] ? (
        <> </>
      ) : (
        <TableContainer variant="striped" w={full} my={10} border={bordes}>
          <Table variant="simple" colorScheme="brand">
            <TableCaption color={modelF}>
              {locale === "en-US" ? en.cart.cI : en.cart.cI}
            </TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th color={modelF}>
                  {locale === "en-US" ? en.quantity : en.quantity}
                </Th>
                <Th color={modelF}>Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {save.map((item) => (
                <SerchCartSave
                  key={item.id}
                  item={item}
                  locale={locale}
                  en={en}
                  es={es}
                  err={locale === "en-US" ? en.error : es.error}
                  added={locale === "en-US" ? en.cart.cG : es.cart.cG}
                  already={locale === "en-US" ? en.cart.cH : es.cart.cH}
                  removed={locale === "en-US" ? en.removed : es.removed}
                  picture={locale === "en-US" ? en.picture : es.picture}
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
