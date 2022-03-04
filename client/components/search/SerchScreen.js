import React from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import {
  AspectRatio,
  Box,
  GridItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
  useDisclosure,
  Collapse,
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
    <GridItem
      height={"410px"}
      onMouseEnter={() => onToggle()}
      onMouseLeave={() => onToggle()}
      onClick={handleSelect}
      cursor={"pointer"}
    >
      <Box width="full" position={"relative"}>
        <VStack
          width="full"
          position={"absolute"}
          spacing={5}
          display={"block"}
          transition={"height .1s ease-out"}
          boxShadow="lg"
          backgroundColor={"Brand.800"}
          rounded="md"
          margin="auto"
          _hover={{
            height: "auto",
            maxHeight: "410px",
            minHeight: "330px",
            zIndex: "2",
            boxShadow: "dark-lg",
          }}
        >
          <AspectRatio ratio={1} w="full" h={224}>
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
      </Box>
    </GridItem>
    
  );
};

export default SerchScreen;
