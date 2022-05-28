import React from "react";

import Image from "next/image";

import { useDispatch } from "react-redux";

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

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import { activeProductCart, deleteProductSave } from "../../actions/product";

const SerchCartSave = ({ id, na, pr, cn, im }) => {
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { full } = Breakpoints();
  // delete Save
  const handleDeleteSave = () => {
    dispatch(deleteProductSave(id));
    Toast("Eliminado con exito", "error", 5000);
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
    const cn = input.value;
    dispatch(activeProductCart({ id, na, pr, im, cn }));
    dispatch(deleteProductSave(id));
  };

  return (
    <>
      <Tr>
        <Td>
          <HStack position={"relative"}>
            <Image
              src={im}
              alt="Picture of the author"
              width={100}
              height={100}
            />
            <VStack>
              <Heading w={full} size={"sm"}>
                {na}
              </Heading>

              <Text w={full}>Precio: ${pr}</Text>
              <Text w={full}>Disponible: {cn}</Text>
            </VStack>
          </HStack>
        </Td>
        <Td display={"flex"} justifyContent={"center"} alignItems={"center"} h={"130px"}>
          <HStack maxW="160px"  >
            <Button fontSize={20} variant={"primary"} {...dec}>
              -
            </Button>
            <Input {...input} />
            <Button fontSize={20} variant={"primary"} {...inc}>
              +
            </Button>
          </HStack>
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
