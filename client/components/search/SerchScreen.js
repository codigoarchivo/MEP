import React, { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

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
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";

import {
  activeProduct,
  cartSaveLatest,
  saveProductCart,
} from "../../actions/product";

import { LoveIcon } from "../../helpers/IconNew";
import Toast from "../../helpers/Toast";
import Breakpoints from "../../helpers/Breakpoints";

const SerchScreen = ({ id, na, cn, ct, ds, dt, es, im, pr }) => {
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
    } else {
      router.push({
        pathname: "/search/details",
        query: { pid: "d", ...data },
      });

      handleSaveLatest();
    }
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
      dispatch(saveProductCart({ id, na, cn, pr, im }));
    }
  };

  const property = {
    reviewCount: 34,
    rating: 4,
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
            <AspectRatio w="248px" h={200} position={"relative"}>
              <Image
                src={im}
                alt="Picture of the author"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </AspectRatio>

            <Flex align="baseline" pt={3} w={"full"} px={3}>
              <Badge colorScheme="green">Producto</Badge>
            </Flex>
            <Box px={3} w={"full"} display="flex" mt={2} alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "brand.800" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {property.reviewCount} reviews
              </Box>
            </Box>
            <Stat width={"full"} px={3} pb={3}>
              <StatLabel>{na}</StatLabel>
              <StatNumber>${pr}</StatNumber>
              <Collapse in={isOpen} animateOpacity>
                <StatHelpText mt={2}>{ds}</StatHelpText>
              </Collapse>
            </Stat>
          </VStack>
        </Box>
      </WrapItem>
    </>
  );
};

export default SerchScreen;
