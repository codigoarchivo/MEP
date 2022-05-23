import React, { useRef } from "react";

import { useSelector } from "react-redux";

import {
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  useDisclosure,
} from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import CheckModal from "./CheckVerify";

import { CartList } from "../../helpers/IconNew";

import CheckModalSale from "./CheckModalSale";

import NavLink from "../../helpers/Navlink";

const CheckoutScreen = ({ product, process, sale, id: idThree }) => {
  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);
  // useSelector
  const { activeSelectCheck: check } = useSelector(({ product }) => product);
  // useRef
  const initialRef = useRef();
  // useDisclosure
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  // Breakpoints
  const { bordes, full } = Breakpoints();

  // id del producto y el rat que esta acumulado
  const { rat, id, uid } = product;

  return (
    <HStack
      w={full}
      justifyContent={"space-between"}
      borderBottom={bordes}
      p={2}
    >
      <HStack spacing={"3"}>
        <NavLink
          href={`/search/checkout/verify/[verify]?n=${a?.uid}`}
          as={`/search/checkout/verify/${idThree}?n=${a?.uid}`}
          name={`Resumén $${product.to}`}
          variant={"primary"}
          size={"xs"}
          textTransform={"uppercase"}
          disabled={process ? true : false}
          backgroundColor={"grey.100"}
          border={bordes}
          leftIcon={<CartList h={5} w={5} />}
        />

        <CheckModalSale
          textTransform={"uppercase"}
          backgroundColor={"grey.100"}
          variant={"primary"}
          size={"xs"}
          border={bordes}
          w={"min-content"}
          disabled={process ? false : true}
          isOpen={isOpen1}
          onOpen={onOpen1}
          onClose={onClose1}
          initialRef={initialRef}
          nameButton={"Datos del vendedor"}
          bordes={bordes}
          // idThree es id del la compra del producto
          idThree={idThree}
          // toda la informacion del producto, que se guardo en el uid del comprador
          product={product}
          // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
          sale={sale}
        />
        <NavLink
          href={`/search/checkout/[rate]?co=${a?.uid}&glo=${idThree}&rat=${rat}&li=${check.length}&close=true`}
          as={`/search/checkout/${id}?co=${a?.uid}&glo=${idThree}&rat=${rat}&li=${check.length}&close=true`}
          name={"Calificar"}
          variant={"primary"}
          fontWeight={"normal"}
          w={"min-content"}
          disabled={process ? false : true}
          size={"xs"}
          border={bordes}
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

export default CheckoutScreen;
