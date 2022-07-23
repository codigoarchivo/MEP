import React from "react";

import Image from "next/image";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import {
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

import { dbProducts } from "../../data/dbProducts";

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

  const handleSelect = async () => {
    //? item.pj : es el porcentaje que coloca onwer
    const message = await dbProducts(item.id, "dbProThree");
    if (message) {
      dispatch(
        activeProductCart(
          {
            ...item,
            cn,
            rat: message.map((item) => item.rat.toString()),
          },
          err,
          added,
          already
        )
      );
      dispatch(deleteProductSave(item.id));
    }
  };

  return (
    <>
      <Tr>
        <Td>
          <HStack position={"relative"}>
            <Image
              src={
                item.im ||
                `https://via.placeholder.com/1000.png?text=${picture}`
              }
              alt={locale === "en" ? item.na.en : item.na.es}
              width={100}
              height={100}
            />
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
        <Td
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"130px"}
        >
          <HStack maxW="160px">
            <Button fontSize={20} variant={"primary"} {...dec}>
              -
            </Button>
            <Input {...input} />
            <Button fontSize={20} variant={"primary"} {...inc}>
              +
            </Button>
          </HStack>
        </Td>
        <Td>${item.pr * input.value}</Td>
        <Td>
          <Menu>
            <MenuButton variant="outline">
              <PlusSquareIcon w={6} h={6} />
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
                  <SmallAddIcon w={3} h={3} />
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
                  <DeleteIcon w={3} h={3} />
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
