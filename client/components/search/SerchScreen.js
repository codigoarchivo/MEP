import React from "react";

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

import NavLink from "../../helpers/Navlink";

const SerchScreen = (props) => {
  // disclosure
  const { isOpen, onToggle } = useDisclosure();

  return (
    <GridItem
      height={"410px"}
      onMouseEnter={() => onToggle()}
      onMouseLeave={() => onToggle()}
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
              src={`/img/${props.image}.jpg`}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
          <Stat width={"full"} p={3}>
            <StatLabel>{props.nombre}</StatLabel>
            <StatNumber>${props.precio}</StatNumber>
            <Collapse in={isOpen} animateOpacity>
              <StatHelpText mt={2}>
                <VStack spacing={3}>
                  <NavLink
                    href={`/search/cart?v=${props.id}`}
                    w={"full"}
                    size={"sm"}
                    variant={"primary"}
                    name={"Agregar Carrito"}
                  />

                  <NavLink
                    href={`/search/details/?v=${props.id}`}
                    border={"solid 1px #00020f"}
                    w={"full"}
                    size={"sm"}
                    variant={"secondary"}
                    name={"Mas Información"}
                  />
                </VStack>
              </StatHelpText>
            </Collapse>
          </Stat>
        </VStack>
      </Box>
    </GridItem>
  );
};

export default SerchScreen;
