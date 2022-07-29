import React from "react";

import Image from "next/image";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";

import { DeleteIcon, PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons";

import { Breakpoints } from "../../helpers/Breakpoints";

import { Toast } from "../../helpers/Toast";

import { activeProductCart, deleteProductSave } from "../../actions/product";

import { ModeColor } from "../../helpers/ModeColor";

export const SerchCartSave = ({
  item,
  locale,
  err,
  added,
  already,
  removed,
  picture,
  en,
  es,
}) => {
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { full } = Breakpoints();
  // delete Save
  const handleDeleteSave = () => {
    dispatch(deleteProductSave(item.id));
    Toast(removed, "error", 5000);
  };
  // Incremen and Decrement
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: item.cn - 1,
  });
  // inc
  const inc = getIncrementButtonProps();
  // dec
  const dec = getDecrementButtonProps();
  // input
  const input = getInputProps({ isReadOnly: true });

  const cn = Number(input.value);
  item.cnr = item.cn - cn;

  const handleSelect = () => {
    dispatch(
      activeProductCart(
        {
          ...item,
          cn,
        },
        err,
        added,
        already
      )
    );
    dispatch(deleteProductSave(item.id));
  };

  const { modelC } = ModeColor();

  return (
    <>
      <Tr>
        <Td>
          <HStack>
            <Box w={100} h={100} position={"relative"}>
              <Image
                src={
                  item.im ||
                  `https://via.placeholder.com/100.png?text=${picture}`
                }
                alt={locale === "en" ? item.na.en : item.na.es}
                layout="fill"
                objectFit="contain"
                quality={100}
              />
            </Box>

            <VStack>
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
                  {locale === "en" ? en.price : es.price}:
                </Heading>
                <Text size={"sm"}>${item.pr}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en" ? en.available : es.available}:
                </Heading>
                <Text size={"sm"}>N°{item.cn - 1}</Text>
              </HStack>
            </VStack>
          </HStack>
        </Td>
        <Td>
          <HStack maxW="160px" minWidth="160px">
            <Button fontSize={20} variant={"primary"} {...dec}>
              -
            </Button>
            <Input {...input} />
            <Button fontSize={20} variant={"primary"} {...inc}>
              +
            </Button>
          </HStack>
        </Td>
        <Td color={modelC}>${item.pr * input.value}</Td>
        <Td>
          <Menu>
            <MenuButton variant="outline">
              <PlusSquareIcon color={modelC} w={6} h={6} />
            </MenuButton>
            <MenuList minWidth={0}>
              <MenuItem>
                <HStack
                  spacing={3}
                  cursor={"pointer"}
                  fontWeight={"normal"}
                  width="full"
                  onClick={handleSelect}
                >
                  <SmallAddIcon color={modelC} w={3} h={3} />
                  <Text>{locale === "en" ? en.add : es.add}</Text>
                </HStack>
              </MenuItem>

              <MenuItem>
                <HStack
                  spacing={3}
                  cursor={"pointer"}
                  fontWeight={"normal"}
                  width="full"
                  onClick={handleDeleteSave}
                >
                  <DeleteIcon color={modelC} w={3} h={3} />
                  <Text>{locale === "en" ? en.delete : es.delete}</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    </>
  );
};

SerchCartSave.propTypes = {
  item: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  err: PropTypes.string.isRequired,
  added: PropTypes.string.isRequired,
  already: PropTypes.string.isRequired,
  removed: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  en: PropTypes.object.isRequired,
  es: PropTypes.object.isRequired,
};
