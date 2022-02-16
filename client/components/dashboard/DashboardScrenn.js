import React from "react";

import Image from "next/image";

import { AspectRatio, HStack } from "@chakra-ui/react";

const DashboardScrenn = (props) => {
  return (
    <HStack h={"full"}>
      <AspectRatio ratio={1} h={224}>
        <Image
          src={`/img/${props.image}.jpg`}
          alt="Picture of the author"
          layout="fill"
          objectFit="contain"
        />
      </AspectRatio>
      sss
    </HStack>
  );
};

export default DashboardScrenn;
