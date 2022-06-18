import React from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { DeleteIcon } from "@chakra-ui/icons";

import { Flex, Heading, HStack, Td, Text, Tr, VStack } from "@chakra-ui/react";

import Toast from "../../helpers/Toast";

import Breakpoints from "../../helpers/Breakpoints";

import { deleteProductCart } from "../../actions/product";

const SerchCartActive = ({ item, inc }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { activeCartSelect: active = [] } = useSelector(
    ({ product }) => product
  );
  // selector
  const { list = [] } = useSelector(({ category }) => category);
  // Breakpoints
  const { full } = Breakpoints();

  // delete cart
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    active.map((item) => (inc.current -= item.pr));
    Toast("Eliminado con exito", "error", 5000);
  };

  return (
    <Tr>
      <Td>
        <HStack>
          <Flex position={"relative"}>
            <Image
              src={item.im || "https://via.placeholder.com/155.png?text=Imagen"}
              alt={item.na}
              width={155}
              height={155}
              objectFit="cover"
              objectPosition="center"
            />
          </Flex>
          <VStack spacing={1}>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                Nombre:
              </Heading>
              <Text size={"sm"}>{item.na}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                Descripción:
              </Heading>
              <Text size={"sm"}>{item.ds}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                Precio:
              </Heading>
              <Text size={"sm"}>${item.pr}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                Cantidad:
              </Heading>
              <Text size={"sm"}>N°{item.cn}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                Categoria:
              </Heading>
              <Text size={"sm"}>
                {list.map(({ id, na }) => id === item.ct && na)}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                Tipo:
              </Heading>
              <Text size={"sm"}>{item.ps}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                Sub Total:
              </Heading>
              <Text size={"sm"}>${item.cn * item.pr}</Text>
            </HStack>
          </VStack>
        </HStack>
      </Td>
      <Td isNumeric>
        <DeleteIcon
          onClick={() => handleDeleteCart(item.id)}
          mx={5}
          cursor={"pointer"}
        />
      </Td>
    </Tr>
  );
};

export default SerchCartActive;
