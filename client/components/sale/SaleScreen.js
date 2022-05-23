import React from "react";

import { HStack, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import NavLink from "../../helpers/Navlink";

const SaleScreen = ({ id: idThree, process, product, info }) => {
  // Breakpoints
  const { bordes, full } = Breakpoints();

  return (
    <HStack
      w={full}
      justifyContent={"space-between"}
      borderBottom={bordes}
      p={2}
    >
      <HStack spacing={"5"}>
        <NavLink
          href={`/history/verify/[verify]`}
          as={`/history/verify/${idThree}`}
          name={`Verificar $${product.to}`}
          variant={"primary"}
          size={"xs"}
          textTransform={"uppercase"}
          disabled={info !== undefined ? false : true}
        />
      </HStack>
      <HStack spacing={"5"}>
        <Tag
          size={"md"}
          variant="outline"
          colorScheme={process ? "green" : "blue"}
        >
          <TagLabel>{process ? "Pagado" : "Proceso"}</TagLabel>
          <TagRightIcon as={process ? UnlockIcon : LockIcon} />
        </Tag>
      </HStack>
    </HStack>
  );
};

export default SaleScreen;
