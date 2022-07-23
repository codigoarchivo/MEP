import React from "react";

import Image from "next/image";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { DeleteIcon } from "@chakra-ui/icons";

import { Flex, Heading, HStack, Td, Text, Tr, VStack } from "@chakra-ui/react";

import { Toast } from "../../helpers/Toast";

import { Breakpoints } from "../../helpers/Breakpoints";

import { deleteProductCart } from "../../actions/product";

export const SerchCartActive = ({ item, inc, locale, en, es }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { activeCartSelect: active = [] } = useSelector(
    ({ process }) => process
  );
  // selector
  const { listData: list = [] } = useSelector(({ category }) => category);
  // Breakpoints
  const { full, displayOff2 } = Breakpoints();

  // delete cart
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    active.map((item) => (inc.current -= item.pr));
    Toast(locale === "en" ? en.removed : es.removed, "error", 5000);
  };

  return (
    <Tr>
      <Td>
        <HStack>
          <Flex position={"relative"} display={displayOff2}>
            <Image
              src={item.im || "https://via.placeholder.com/155.png?text=Imagen"}
              alt={locale === "en" ? item.na.en : item.na.es}
              width={155}
              height={155}
              objectFit="cover"
              objectPosition="center"
            />
          </Flex>
          <VStack spacing={1}>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en" ? en.name : es.name}:
              </Heading>
              <Text size={"sm"}>
                {locale === "en" ? item.na.en : item.na.es}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en" ? en.description : es.description}:
              </Heading>
              <Text size={"sm"}>
                {locale === "en" ? item.ds.en : item.ds.es}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en" ? en.price : es.price}:
              </Heading>
              <Text size={"sm"}>${item.pr}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en" ? en.quantity : es.quantity}:
              </Heading>
              <Text size={"sm"}>N°{item.cn}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en" ? en.major.mF : es.major.mF}:
              </Heading>
              <Text size={"sm"}>
                {list.map(
                  (i) =>
                    i.id === item.ct && (locale === "en" ? i?.na.en : i?.na.es)
                )}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en" ? en.guy : es.guy}:
              </Heading>
              <Text size={"sm"}>
                {locale === "en" ? item.ps.en : item.ps.es}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en" ? en.subtotal : es.subtotal}:
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
  locale: PropTypes.string.isRequired,
  en: PropTypes.object.isRequired,
  es: PropTypes.object.isRequired,
};
