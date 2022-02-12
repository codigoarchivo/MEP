import React from "react";

import Image from "next/image";

import {
  AspectRatio,
  GridItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";

const listProducts = (props) => {
  console.log(props);
  return (
    <GridItem p={5}>
      <VStack spacing={5}>
        <AspectRatio ratio={1} w={150}>
          <Image
            src={`/img/${props.image}.jpg`}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </AspectRatio>
        <Stat>
          <StatLabel>{props.nombre}</StatLabel>
          <StatNumber>${props.precio}</StatNumber>
          <StatHelpText>{props.descripcion}</StatHelpText>
        </Stat>
      </VStack>
    </GridItem>
  );
};

export default listProducts;
