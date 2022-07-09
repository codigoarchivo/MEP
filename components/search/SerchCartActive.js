import React from "react";

import Image from "next/image";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { DeleteIcon } from "@chakra-ui/icons";

import { Flex, Heading, HStack, Td, Text, Tr, VStack } from "@chakra-ui/react";

import Toast from "../../helpers/Toast";

import Breakpoints from "../../helpers/Breakpoints";

import { deleteProductCart } from "../../actions/product";

const SerchCartActive = ({
  item,
  inc,
  name,
  description,
  price,
  quantity,
  category,
  guy,
  subtotal,
  removed,
}) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { activeCartSelect: active = [] } = useSelector(
    ({ process }) => process
  );
  // selector
  const { list = [] } = useSelector(({ category }) => category);
  // Breakpoints
  const { full, displayOff2 } = Breakpoints();

  // delete cart
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    active.map((item) => (inc.current -= item.pr));
    Toast(removed, "error", 5000);
  };

  return (
    <Tr>
      <Td>
        <HStack>
          <Flex position={"relative"} display={displayOff2}>
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
                {name}:
              </Heading>
              <Text size={"sm"}>{item.na}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {description}:
              </Heading>
              <Text size={"sm"}>{item.ds}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {price}:
              </Heading>
              <Text size={"sm"}>${item.pr}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {quantity}:
              </Heading>
              <Text size={"sm"}>N°{item.cn}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {category}:
              </Heading>
              <Text size={"sm"}>
                {list.map(({ id, na }) => id === item.ct && na)}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {guy}:
              </Heading>
              <Text size={"sm"}>{item.ps}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {subtotal}:
              </Heading>
              <Text size={"sm"}>${item.cn * item.pr}</Text>
            </HStack>
          </VStack>
        </HStack>
      </Td>
      <Td isNumeric>
        <DeleteIcon
          onClick={() => handleDeleteCart(item.id)}
          mx={{ base: 0, md: 5 }}
          cursor={"pointer"}
        />
      </Td>
    </Tr>
  );
};

SerchCartActive.propTypes = {
  item: PropTypes.object.isRequired,
  inc: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  guy: PropTypes.string.isRequired,
  subtotal: PropTypes.string.isRequired,
  removed: PropTypes.string.isRequired,
};

export default SerchCartActive;
