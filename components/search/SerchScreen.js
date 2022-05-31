import React, { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Rating } from "react-simple-star-rating";

import Image from "next/image";

import {
  AspectRatio,
  Box,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
  useDisclosure,
  Collapse,
  Flex,
  Badge,
  WrapItem,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";

import { cartSaveLatest, saveProductCart } from "../../actions/product";

import { LoveIcon } from "../../helpers/IconNew";
import Toast from "../../helpers/Toast";
import Breakpoints from "../../helpers/Breakpoints";

import { ShopAll } from "../../helpers/IconNew";

const SerchScreen = ({ id, na, cn, ct, ds, dt, es, im, pr, rat, ti, uid }) => {
  // useRef
  const match = useRef();
  // useRef
  const matchValid = useRef();
  // Breakpoints
  const { bordes } = Breakpoints();
  // selector
  const { activeCartSelect, saveCartSelect } = useSelector(
    ({ product }) => product
  );

  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // disclosure
  const { isOpen, onToggle } = useDisclosure();

  // data product
  const data = {
    id,
    na,
    pr,
    im,
    ds,
    ct,
    cn,
    es,
    dt,
    ti,
    uid,
    est: rat?.est,
    nam: rat?.nam,
  };

  // ref
  match.current = activeCartSelect.map((item) => item.id).includes(id);
  matchValid.current = saveCartSelect.map((item) => item.id).includes(id);
  // select
  const handleSelect = () => {
    // activeCartSelect
    if (match.current) {
      return Toast("Producto ya esta en el carrito", "error", 5000);
    }
    // saveCartSelect
    if (matchValid.current) {
      Toast("Producto ya esta en la lista deseo", "info", 5000);
      router.push({
        pathname: "/search/cart",
        query: { pid: id },
      });
    }
    // dispatch
    router.push({
      pathname: "/search/[details]",
      query: {
        details: id,
        pid: "d",
      },
    });

    handleSaveLatest();
  };

  // Latest
  const handleSaveLatest = () => {
    dispatch(
      cartSaveLatest({
        ...data,
      })
    );
  };
  // save
  const handleSave = () => {
    // activeCartSelect
    if (match.current) {
      return Toast("Producto ya esta en el carrito", "error", 5000);
    } else {
      Toast(
        matchValid.current
          ? "Eliminado lista deseos"
          : "Lista de deseos guardada",
        matchValid.current ? "error" : "success",
        5000
      );
      dispatch(saveProductCart({ ...data }));
    }
  };

  return (
    <>
      <WrapItem mx={5}>
        <Box position={"relative"}>
          <Box
            as={LoveIcon}
            color={matchValid.current ? "red" : "GrayText"}
            position={"absolute"}
            zIndex={1}
            left={3}
            top={3}
            cursor={"pointer"}
            onClick={handleSave}
          />
        </Box>
        <Box
          height={"410px"}
          w="250px"
          position={"relative"}
          onClick={handleSelect}
        >
          <VStack
            spacing={1}
            onMouseEnter={() => onToggle()}
            onMouseLeave={() => onToggle()}
            cursor={"pointer"}
            w="250px"
            position={"absolute"}
            border={bordes}
            rounded="md"
            _hover={{
              maxHeight: "410px",
              minHeight: "330px",
              boxShadow: "lg",
            }}
          >
            {im && (
              <Box position={"relative"}>
                <Image
                  src={im}
                  alt="Picture of the author"
                  objectPosition="center"
                  width={"248px"}
                  height={"248px"}
                />
              </Box>
            )}
            <Box p={3} w={"full"}>
              <Flex align="baseline" w={"full"}>
                <Badge colorScheme="green">{ti}</Badge>
              </Flex>

              <HStack w={"full"} spacing={0}>
                <Rating
                  size={17}
                  ratingValue={rat !== undefined ? rat.est : 0}
                  readonly={true}
                />
                <Text
                  h={"full"}
                  color="gray.600"
                  fontSize={"lg"}
                  fontWeight={"bold"}
                >
                  {rat !== undefined ? rat.nam : "0.0"}
                </Text>{" "}
              </HStack>

              <Stat size={"sm"} width={"full"}>
                <StatLabel>{na}</StatLabel>
                <StatNumber>
                  <HStack w={"full"} justifyContent={"space-between"}>
                    <Text>${pr}</Text>
                    <Icon as={ShopAll} w={6} h={6} />
                  </HStack>
                </StatNumber>
                <Collapse in={isOpen} animateOpacity>
                  <StatHelpText mt={2}>{ds}</StatHelpText>
                </Collapse>
              </Stat>
            </Box>
          </VStack>
        </Box>
      </WrapItem>
    </>
  );
};

export default SerchScreen;
