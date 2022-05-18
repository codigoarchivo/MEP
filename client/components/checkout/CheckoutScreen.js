import React, { useRef } from "react";

import {
  Button,
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  useDisclosure,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import CheckModal from "./CheckModal";

import { CartList } from "../../helpers/IconNew";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

const CheckoutScreen = ({ product, process, buy, sale }) => {
  // useRef
  const initialRef = useRef();
  // useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Breakpoints
  const { bordes, full } = Breakpoints();

  const handleSelect = () => {
    router.push({
      pathname: "/search/checkout/rate",
      query: {
        id: item.product.id,
        rat: item.product.rat,
        li: activeSelectCheck.length,
      },
    });
  };
  return (
    <HStack
      w={full}
      justifyContent={"space-between"}
      borderBottom={bordes}
      p={2}
    >
      <HStack spacing={"5"}>
        <CheckModal
          backgroundColor={"grey.100"}
          leftIcon={<CartList h={5} w={5} />}
          variant={"primary"}
          size={"xs"}
          border={bordes}
          w={"min-content"}
          disabled={process ? true : false}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          initialRef={initialRef}
          nameButton={`resumen $${
            Number(product.cn) * Number(product.pr) +
            Number(product.cn) * Number(product.pr) * 0.2
          }`}
          bordes={bordes}
          product={product}
          buy={buy}
          sale={sale}
        />
        <Button
          backgroundColor={"grey.100"}
          variant={"primary"}
          size={"xs"}
          border={bordes}
          w={"min-content"}
          onClick={handleSelect}
          disabled={process ? false : true}
        >
          Calificar
        </Button>
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

export default CheckoutScreen;
