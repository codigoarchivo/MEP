import React from "react";

import { useDispatch } from "react-redux";

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

import { activeProduct } from "../../actions/product";

const SerchScreen = ({ id, na, cn, ct, ds, dt, es, im, pr }) => {
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

  return (
    <WrapItem
      justifyContent="center"
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
          <Badge colorScheme="green">new</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="green.500"
          >
            Producto
          </Text>
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
    </WrapItem>
  );
};

export default SerchScreen;
