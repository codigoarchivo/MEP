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
} from "@chakra-ui/react";

const SerchScreen = (props) => {
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
    >
      <VStack
        onMouseEnter={() => onToggle()}
        onMouseLeave={() => onToggle()}
        cursor={"pointer"}
        width="full"
        position={"absolute"}
        spacing={5}
        boxShadow="lg"
        rounded="md"
        _hover={{
          maxHeight: "410px",
          minHeight: "330px",
          boxShadow: "dark-lg",
        }}
      >
        <AspectRatio w="full" h={224}>
          <Image
            src={`/img/${props.im}.jpg`}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </AspectRatio>
        <Stat width={"full"} p={3}>
          <StatLabel>{props.no}</StatLabel>
          <StatNumber>${props.pr}</StatNumber>
          <Collapse in={isOpen} animateOpacity>
            <StatHelpText mt={2}>{props.ds}</StatHelpText>
          </Collapse>
        </Stat>
      </VStack>
    </WrapItem>
  );
};

export default SerchScreen;
