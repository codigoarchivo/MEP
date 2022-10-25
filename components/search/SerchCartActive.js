import React from "react";

import Image from "next/image";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { DeleteIcon } from "@chakra-ui/icons";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { Toast } from "../../helpers/Toast";

import { Breakpoints } from "../../helpers/Breakpoints";

import { ModeColor } from "../../helpers/ModeColor";

import { deleteProductCart } from "../../actions/product";

export const SerchCartActive = ({ item, inc, locale, en, es }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { activeCartSelect: active = [] } = useSelector(({ cart }) => cart);
  // selector
  const { listData: list = [] } = useSelector(({ listca }) => listca);
  // Breakpoints
  const { full, displayOff2 } = Breakpoints();

  // delete cart
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    active.map((item) => (inc.current -= item.pr));
    Toast(locale === "en-US" ? en.removed : es.removed, "error", 5000);
  };

  const { modelF } = ModeColor();

  return (
    <Tr>
      <Td>
        <HStack>
          <Box w={155} h={155} position={"relative"}>
            <Image
              src={item.im || "https://via.placeholder.com/155.png?text=Imagen"}
              alt={locale === "en-US" ? item.na.en : item.na.es}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
            />
          </Box>
          <VStack spacing={1}>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en-US" ? en.name : es.name}:
              </Heading>
              <Text size={"sm"}>
                {locale === "en-US" ? item.na.en : item.na.es}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en-US" ? en.description : es.description}:
              </Heading>
              <Text size={"sm"}>
                {locale === "en-US" ? item.ds.en : item.ds.es}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en-US" ? en.price : es.price}:
              </Heading>
              <Text size={"sm"}>${item.pr}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en-US" ? en.quantity : es.quantity}:
              </Heading>
              <Text size={"sm"}>N°{item.cn}</Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en-US" ? en.major.mF : es.major.mF}:
              </Heading>
              <Text size={"sm"}>
                {list.map(
                  (i) =>
                    i.id === item.ct &&
                    (locale === "en-US" ? i?.na.en : i?.na.es)
                )}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en-US" ? en.guy : es.guy}:
              </Heading>
              <Text size={"sm"}>
                {locale === "en-US" ? item.ps.en : item.ps.es}
              </Text>
            </HStack>
            <HStack w={full}>
              <Heading as="h3" size="sm">
                {locale === "en-US" ? en.subtotal : es.subtotal}:
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
          color={modelF}
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
