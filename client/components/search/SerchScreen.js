import React from "react";

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
  WrapItem,
  Flex,
  Badge,
  Text,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";

import { activeProduct, saveProductCart } from "../../actions/product";

import { LoveIcon } from "../../helpers/IconNew";

const SerchScreen = ({ id, na, cn, ct, ds, dt, es, im, pr }) => {
  // selector
  const { saveCartSelect } = useSelector(({ product }) => product);
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

  // select
  const handleSelect = () => {
    dispatch(
      activeProduct({
        word: "Details",
        ...data,
      })
    );

    router.push({
      pathname: "/search/details",
      query: { pid: id },
    });
  };

  // save
  const handleSave = () => {
    dispatch(saveProductCart({ id, na, cn, pr, im }));
  };

  return (
    <>
      <Box position={"relative"} zIndex={"modal"}>
        <Box
          as={LoveIcon}
          color={
            saveCartSelect.map((x) => x.id).includes(id) ? "red" : "GrayText"
          }
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
          boxShadow="lg"
          rounded="md"
          _hover={{
            maxHeight: "410px",
            minHeight: "330px",
            boxShadow: "dark-lg",
          }}
        >
          <AspectRatio w="250px" h={200} position={"relative"}>
            <Image
              src={im}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>

          <Flex align="baseline" pt={3} w={"full"} px={3}>
            <Badge colorScheme="green">Producto</Badge>
          </Flex>
          <Flex mt={2} align="center" w={"full"} px={3}>
            <Box as={StarIcon} color="orange.400" />
            <Text ml={1} fontSize="sm">
              <b>4.84</b> (190)
            </Text>
          </Flex>
          <Stat width={"full"} px={3} pb={3}>
            <StatLabel>{na}</StatLabel>
            <StatNumber>${pr}</StatNumber>
            <Collapse in={isOpen} animateOpacity>
              <StatHelpText mt={2}>{ds}</StatHelpText>
            </Collapse>
          </Stat>
        </VStack>
      </Box>
    </>
  );
};

export default SerchScreen;
