import React, { useRef } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Search2Icon } from "@chakra-ui/icons";

import {
  AspectRatio,
  CloseButton,
  Heading,
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

import Breakpoints from "../../../helpers/Breakpoints";
import { CartIcon } from "../../../helpers/IconNew";
import NavLink from "../../../utils/Navlink";

const NavbarCart = () => {
  // router
  const router = useRouter();
  // Breakpoints
  const { full, bordes } = Breakpoints();
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const inc = useRef(0);
  // selector
  const { activeCartSelect = [] } = useSelector(({ product }) => product);
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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>
              <NavLink
                size={"sm"}
                variant={"primary"}
                href={
                  router.pathname !== "/search/cart"
                    ? "/search/cart"
                    : "/search"
                }
                name={"Ir a"}
                rightIcon={
                  router.pathname !== "/search/cart" ? (
                    <CartIcon />
                  ) : (
                    <Search2Icon />
                  )
                }
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {activeCartSelect.map((item) => (
            <Tr key={item.id}>
              <Td>
                <CloseButton
                  onClick={() => handleDeleteCart(item.id)}
                  rounded={"full"}
                  backgroundColor={"red.100"}
                  size="sm"
                />
                <AspectRatio ratio={1} w={59} h={59} position={"relative"}>
                  <Image
                    src={item.im}
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="contain"
                  />
                </AspectRatio>
              </Td>
              <Td>
                <VStack spacing={1}>
                  <HStack w={full}>
                    <Heading textTransform={"uppercase"} fontSize={"small"}>
                      nombre:{" "}
                    </Heading>
                    <Text>{item.na}</Text>
                  </HStack>
                  <HStack w={full}>
                    <Heading textTransform={"uppercase"} fontSize={"small"}>
                      precio:{" "}
                    </Heading>
                    <Text>${item.pr}</Text>
                  </HStack>
                  <HStack w={full}>
                    <Heading textTransform={"uppercase"} fontSize={"small"}>
                      cantidad:{" "}
                    </Heading>
                    <Text>{item.cn}</Text>
                  </HStack>
                  <HStack w={full}>
                    <Heading textTransform={"uppercase"} fontSize={"small"}>
                      Sub Total:{" "}
                    </Heading>
                    <Text>${item.pr * item.cn}</Text>
                  </HStack>
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

export default NavbarCart;
