import React from "react";

import { HStack, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import NavLink from "../../utils/Navlink";

const SaleScreen = ({ item = {} }) => {
  // Breakpoints
  const { bordes, full } = Breakpoints();

  const { idThree } = item;

  const { uid, to } = item.product;
  return (
    <HStack
      w={full}
      justifyContent={"space-between"}
      borderBottom={bordes}
      p={2}
    >
      <HStack spacing={"5"}>
        <NavLink
          href={`/history/verify/[verify]?uid=${uid}`}
          as={`/history/verify/${idThree}?uid=${uid}`}
          name={`Verificar $${to}`}
          variant={"primary"}
          size={"xs"}
          textTransform={"uppercase"}
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
