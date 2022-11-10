import React, { useRef } from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import { Breakpoints } from "../../helpers/Breakpoints";

import { CartList } from "../../helpers/IconNew";

import { ContadorRegresivo } from "../../helpers/ContadorRegresivo";

import { messagesCant } from "../../actions/checkout";

export const CheckoutScreen = ({
  product = {},
  process,
  push,
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
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // useRef
  const initRef = useRef();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  // envia el recibo del pago a la base de datos
  const handleVerify = () => {
    push({
      pathname: "/verify/[id]",
      query: {
        id,
        uid: a.uid,
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
  const handleReview = async () => {
    const { docs } = await getDocs(
      collection(db, "serchs", product.id, "messages")
    );

    let el = [];

    docs.map((doc) => el.push(doc.data().rat));

    dispatch(messagesCant(el));

    push({
      pathname: "/review",
      query: {
        p: product.id, // id del producto se utilizara para guardar ranking
        g: id,
        i: "new",
      },
    });
  };

  return (
    <>
      {lim !== undefined && count !== undefined ? (
        <ContadorRegresivo lim={lim} count={count} />
      ) : (
        "No information"
      )}
      <Stack
        w={full}
        flexDirection={content5}
        alignItems={{ base: "start", md: "flex-end" }}
        justifyContent={"space-between"}
        borderBottom={bordes}
        p={2}
        spacing={6}
      >
        <Button
          variant={"primary"}
          leftIcon={<CartList h={5} w={5} />}
          size={"xs"}
          fontWeight={"normal"}
          w={"min-content"}
          disabled={process ? true : false}
          border={bordes}
          onClick={handleVerify}
          textTransform={"uppercase"}
        >
          {`${sE} $${product.to}`}
        </Button>
        <Button
          display={process ? "block" : "none"}
          size={"xs"}
          fontWeight={"normal"}
          variant={"primary"}
          w={"min-content"}
          disabled={process ? false : true}
          border={bordes}
          onClick={handleUser}
          textTransform={"uppercase"}
        >
          {sF}
        </Button>

        <Button
          display={process ? "block" : "none"}
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
        <Flex>
          <Popover
            boundary={HTMLElement | "clippingParents" | "scrollParent"}
            matchWidth={true}
            closeOnBlur={false}
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
                  <TagLabel textTransform={"uppercase"}>
                    {process ? paid : pro}
                  </TagLabel>
                  <TagRightIcon as={process ? UnlockIcon : LockIcon} />
                </Tag>
              </PopoverTrigger>
              <Portal>
                <PopoverContent w={260}>
                  <PopoverHeader>{sJ}</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text
                      as={"span"}
                      id={`resLimit_${count}`}
                      fontWeight={"black"}
                      fontSize={"x-small"}
                      textTransform={"uppercase"}
                    ></Text>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          </Popover>
        </Flex>
      </Stack>
    </>
  );
};

CheckoutScreen.propTypes = {
  product: PropTypes.object,
  process: PropTypes.bool,
  id: PropTypes.string,
  lim: PropTypes.number,
  count: PropTypes.number,
  sal: PropTypes.string,
  sE: PropTypes.string,
  sF: PropTypes.string,
  sH: PropTypes.string,
  sJ: PropTypes.string,
  paid: PropTypes.string,
  pro: PropTypes.string,
};
