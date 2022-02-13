import React, { useState } from "react";

import Image from "next/image";

import { useRouter } from "next/router";

import {
  AspectRatio,
  Box,
  GridItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";

const ListScreen = (props) => {
  // router
  const router = useRouter();
  const [isHovered, toggleHover] = useState(false);

  return (
    <GridItem
      height={"392px"}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      onClick={() =>
        router.push({
          pathname: `/products/[v]`,
          query: { v: props.id },
        })
      }
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
          cursor={"pointer"}
          rounded="md"
          margin="auto"
          _hover={{
            height: "auto",
            maxHeight: "392px",
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
            {isHovered ? <StatHelpText>{props.descripcion}</StatHelpText> : ""}
          </Stat>
        </VStack>
      </Box>
    </GridItem>
  );
};

export default ListScreen;
