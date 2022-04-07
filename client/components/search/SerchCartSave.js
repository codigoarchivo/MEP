import React from "react";

import Image from "next/image";

import { useDispatch } from "react-redux";

import {
  AspectRatio,
  Box,
  Button,
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
} from "@chakra-ui/react";

import { DeleteIcon, PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import { activeProductCart, deleteProductSave } from "../../actions/product";

const SerchCartSave = ({ id, na, pr, cn, im }) => {
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { full, points18 } = Breakpoints();
  // delete Save
  const handleDeleteSave = () => {
    dispatch(deleteProductSave(id));
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
    max: cn,
  });
  // inc
  const inc = getIncrementButtonProps();
  // dec
  const dec = getDecrementButtonProps();
  // input
  const input = getInputProps({ isReadOnly: true });

  const handleSelect = () => {
    const total = pr * input.value;
    const cantidad = input.value;
    dispatch(activeProductCart({ id, na, pr, im, cantidad, total }));
    dispatch(deleteProductSave(id));
  };

  return (
    <>
      <Tr>
        <Td>
          <AspectRatio ratio={1} w={59} h={59} position={"relative"}>
            <Image
              src={im}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
        </Td>
        <Td>{na}</Td>
        <Td>${pr}</Td>
        <Td>{cn}</Td>
        <Td>
          <Box w={full}>
            <HStack maxW="160px">
              <Button fontSize={20} variant={"primary"} {...dec}>
                -
              </Button>
              <Input {...input} />
              <Button fontSize={20} variant={"primary"} {...inc}>
                +
              </Button>
            </HStack>
          </Box>
        </Td>
        <Td>${pr * input.value}</Td>
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
                  <Text>Agregar</Text>
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
                  <Text>Eliminar</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    </>
  );
};

export default SerchCartSave;
