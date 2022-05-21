import React, { useRef } from "react";

import {
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  useDisclosure,
} from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import { CartList } from "../../helpers/IconNew";

import SaleModal from "./SaleModal";

const SaleScreen = ({ product, process, buy, sale, id: idThree, info }) => {
  // useRef
  const initialRef = useRef();
  // useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Breakpoints
  const { bordes, full } = Breakpoints();

  return (
    <HStack
      w={full}
      justifyContent={"space-between"}
      borderBottom={bordes}
      p={2}
    >
      <HStack spacing={"5"}>
        <SaleModal
          backgroundColor={"grey.100"}
          leftIcon={<CartList h={5} w={5} />}
          variant={"primary"}
          size={"xs"}
          border={bordes}
          w={"min-content"}
          disabled={info ? false : true}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          initialRef={initialRef}
          nameButton={`resumen $${product.to}`}
          bordes={bordes}
          // idThree es id del la compra del producto
          idThree={idThree}
          // toda la informacion del producto, que se guardo en el uid del comprador
          product={product}
          // toda la informacion del comprador, que se guardo para que se refleje en el checkout
          buy={buy}
          // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
          sale={sale}
          // información del pago del producto
          info={info}
        />
      </HStack>
      <HStack spacing={"5"}>
        <Tag
          size={"md"}
          variant="outline"
          colorScheme={process ? "green" : "blue"}
        >
          <TagLabel>{process ? "Pagado" : "Proceso"}</TagLabel>
          <TagRightIcon as={process ? UnlockIcon : LockIcon} />
        </Tag>
      </HStack>
    </HStack>
  );
};

export default SaleScreen;
