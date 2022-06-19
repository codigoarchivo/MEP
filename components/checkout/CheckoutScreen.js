import React, { useRef } from "react";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import {
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import { CartList } from "../../helpers/IconNew";

import CheckModalSale from "./CheckModalSale";

import NavLink from "../../utils/Navlink";

import ContadorRegresivo from "../../helpers/ContadorRegresivo";

const CheckoutScreen = ({
  product = {},
  process,
  id: idThree,
  lim,
  count,
  sale = {},
}) => {
  // useSelector
  const { activeSelectCheck: check = [] } = useSelector(
    ({ product }) => product
  );
  // useRef
  const initialRef = useRef();
  // useRef
  const initRef = useRef();
  // useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Breakpoints
  const { bordes, full } = Breakpoints();

  // id del producto y el rat que esta acumulado
  const { rat, id } = product;

  return (
    <>
      <ContadorRegresivo lim={lim} count={count} />
      <HStack
        w={full}
        justifyContent={"space-between"}
        borderBottom={bordes}
        p={2}
      >
        <HStack spacing={"3"}>
          <NavLink
            href={`/verify/[id]`}
            as={`/verify/${[idThree]}`}
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
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            initialRef={initialRef}
            nameButton={"Datos del vendedor"}
            bordes={bordes}
            // idThree es id del la compra del producto
            idThree={idThree}
            // toda la informacion del producto, que se guardo en el uid del comprador
            sale={sale}
            // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
            // sale={sale}
          />
          <NavLink
            href={`/checkout/[rate]?glo=${idThree}&rat=${rat}&li=${check.length}&close=true`}
            as={`/checkout/${id}?glo=${idThree}&rat=${rat}&li=${check.length}&close=true`}
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
          <Popover
            closeOnBlur={false}
            placement="left"
            initialFocusRef={initRef}
          >
            {({ isOpen }) => (
              <>
                <PopoverTrigger>
                  <Tag
                    size={"md"}
                    variant="outline"
                    cursor={process ? "not-allowed" : "pointer"}
                    colorScheme={process ? "green" : "blue"}
                  >
                    <TagLabel>
                      Click to {isOpen ? "close" : "open"}{" "}
                      {process ? "Pagado" : "Proceso"}
                    </TagLabel>
                    <TagRightIcon as={process ? UnlockIcon : LockIcon} />
                  </Tag>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverHeader>Tiempo para realizar pago</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text
                        as={"span"}
                        id={`resLimit_${count}`}
                        fontWeight={"black"}
                        fontSize={"small"}
                      ></Text>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        </HStack>
      </HStack>
    </>
  );
};

CheckoutScreen.propTypes = {
  product: PropTypes.object,
  process: PropTypes.bool,
  id: PropTypes.string,
  lim: PropTypes.object,
  count: PropTypes.number,
  sale: PropTypes.object,
};

export default CheckoutScreen;
