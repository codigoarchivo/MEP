import React, { useRef } from "react";

import PropTypes from "prop-types";

import {
  Button,
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
} from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import { CartList } from "../../helpers/IconNew";

import ContadorRegresivo from "../../helpers/ContadorRegresivo";

const CheckoutScreen = ({
  product = {},
  process,
  push,
  locale,
  id,
  lim,
  count,
  sal,
  paid,
  pro,
  sE,
  sF,
  sH,
  sJ,
}) => {
  // useRef
  const initRef = useRef();
  // Breakpoints
  const { bordes, full } = Breakpoints();

  // envia el recibo del pago a la base de datos
  const handleVerify = () => {
    push({
      pathname: "/verify/[id]",
      query: {
        id,
      },
    });
  };

  // despues de verificar el pago se puede ver los datos del vendedor
  const handleUser = () => {
    if (process !== false) {
      push({
        pathname: "/info/[uid]",
        query: {
          uid: sal,
        },
      });
    }
  };

  //  puede enviarle un comentario al vendedor
  const handleReview = () => {
    push({
      pathname: "/review",
      query: {
        p: product.id,
        g: id,
        i: "new",
      },
    });
  };

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
          <Button
            leftIcon={<CartList h={5} w={5} />}
            backgroundColor={"grey.100"}
            size={"xs"}
            fontWeight={"normal"}
            variant={"secondary"}
            w={"min-content"}
            disabled={process ? true : false}
            border={bordes}
            onClick={handleVerify}
            textTransform={"uppercase"}
          >
            {`${sE} $${product.to}`}
          </Button>
          <Button
            size={"xs"}
            fontWeight={"normal"}
            variant={"secondary"}
            w={"min-content"}
            disabled={process ? false : true}
            border={bordes}
            onClick={handleUser}
            textTransform={"uppercase"}
          >
            {sF}
          </Button>

          <Button
            size={"xs"}
            fontWeight={"normal"}
            variant={"primary"}
            w={"min-content"}
            disabled={process ? false : true}
            border={bordes}
            onClick={handleReview}
            textTransform={"uppercase"}
          >
            {sH}
          </Button>
        </HStack>
        <HStack spacing={"5"}>
          <Popover
            closeOnBlur={false}
            placement="left"
            initialFocusRef={initRef}
          >
            <>
              <PopoverTrigger>
                <Tag
                  size={"md"}
                  variant="outline"
                  cursor={process ? "not-allowed" : "pointer"}
                  colorScheme={process ? "green" : "blue"}
                >
                  <TagLabel textTransform={"uppercase"}>{process ? paid : pro}</TagLabel>
                  <TagRightIcon as={process ? UnlockIcon : LockIcon} />
                </Tag>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverHeader>{sJ}</PopoverHeader>
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
  sal: PropTypes.string,
  sE: PropTypes.string,
  sF: PropTypes.string,
  sH: PropTypes.string,
  sJ: PropTypes.string,
  paid: PropTypes.string,
  pro: PropTypes.string,
};

export default CheckoutScreen;
