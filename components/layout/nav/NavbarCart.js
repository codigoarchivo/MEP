import React, { useRef } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Search2Icon } from "@chakra-ui/icons";

import {
  AspectRatio,
  CloseButton,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
  Tfoot,
} from "@chakra-ui/react";

import { deleteProductCart } from "../../../actions/product";

import { Breakpoints } from "../../../helpers/Breakpoints";
import { CartIcon } from "../../../helpers/IconNew";

import { NavLink } from "../../../utils/Navlink";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export const NavbarCart = () => {
  // router
  const { pathname, locale } = useRouter();
  // Breakpoints
  const { full, bordes } = Breakpoints();
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const inc = useRef(0);
  // selector
  const { activeCartSelect = [] } = useSelector(({ cart }) => cart);
  // incrementa y encapsula información para evitar que se actualice
  inc.current = activeCartSelect.reduce(
    (total, item) => (total += Number(item.cn) * Number(item.pr)),
    0
  );

  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    activeCartSelect.map((item) => (inc.current -= item.total));
  };

  return (
    <TableContainer w={"full"} border={bordes}>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>
              <NavLink
                size={"sm"}
                variant={"primary"}
                href={pathname !== "/cart" ? "/cart" : "/search"}
                name={pathname !== "/cart" ? <CartIcon /> : <Search2Icon />}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {activeCartSelect.map((item) => (
            <Tr key={item.id}>
              <Td position={"relative"}>
                <CloseButton
                  onClick={() => handleDeleteCart(item.id)}
                  rounded={"full"}
                  backgroundColor={"red.100"}
                  size="sm"
                  position={"absolute"}
                  top={9}
                  right={4}
                  zIndex={10}
                />
                <AspectRatio ratio={1} w={120} h={120} position={"relative"}>
                  <Image
                    src={item.im}
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="contain"
                  />
                </AspectRatio>
              </Td>
              <Td>
                <VStack spacing={0}>
                  {[
                    {
                      nombre: locale === "en" ? en.name : es.name,
                      Valor: locale === "en" ? item.na.en : item.na.es,
                    },
                    {
                      nombre: locale === "en" ? en.quantity : es.quantity,
                      Valor: "N°" + item.cn,
                    },
                    {
                      nombre: locale === "en" ? en.price : es.price,
                      Valor: "$" + item.pr,
                    },
                    {
                      nombre: locale === "en" ? en.subtotal : es.subtotal,
                      Valor: "$" + item.pr * item.cn,
                    },
                  ].map(({ nombre, Valor }, key) => (
                    <HStack w={full} key={key} justifyContent={"space-between"}>
                      <Text fontWeight={"black"}>{nombre}: </Text>
                      <Text>{Valor}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <>
              <Th></Th>
              <Th>Total: ${inc.current}</Th>
            </>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
