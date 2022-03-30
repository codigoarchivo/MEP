import React from "react";

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

const SerchScreen = ({ id, na, cn, ct, ds, dt, es, im, pr }) => {
  // router
  const router = useRouter();
  // disclosure
  const { isOpen, onToggle } = useDisclosure();

  // select
  const handleSelect = () => {
    router.push({
      pathname: "/search/details",
      query: { pid: props.id },
    });
  };

  return (
    <WrapItem
      justifyContent="center"
      height={"410px"}
      w="280px"
      position={"relative"}
      onClick={handleSelect}
      p={5}
    >
      <VStack
        onMouseEnter={() => onToggle()}
        onMouseLeave={() => onToggle()}
        cursor={"pointer"}
        width="full"
        position={"absolute"}
        boxShadow="lg"
        rounded="md"
        _hover={{
          maxHeight: "410px",
          minHeight: "330px",
          boxShadow: "dark-lg",
        }}
      >
        <Image
          src={im}
          alt="Picture of the author"
          layout="fill"
          objectFit="contain"
        />
        <Flex align="baseline" mt={2} w={"full"} p={3}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Stat width={"full"} p={3}>
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
