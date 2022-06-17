import React from "react";

import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import PropTypes from "prop-types";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";

import Breakpoints from "../../helpers/Breakpoints";

import NavLink from "../../utils/Navlink";

const SaleScreen = ({ item = {} }) => {
  // Breakpoints
  const { bordes, full } = Breakpoints();

  const { cre, uidBuy, fer, co, nap, id } = item;

  const { uid, to } = item.product;
  return (
    <HStack
      w={full}
      justifyContent={"space-between"}
      alignItems={"flex-end"}
      borderBottom={bordes}
      p={2}
    >
      <VStack w={full} spacing={0}>
        <HStack w={full}>
          <Heading as="h3" size="sm">
            Nombre:
          </Heading>
          <Text size={"sm"}>{nap}</Text>
        </HStack>
        <HStack w={full}>
          <Heading as="h3" size="sm">
            Correo:
          </Heading>
          <Text size={"sm"}>{co}</Text>
        </HStack>
        <HStack w={full}>
          <Heading as="h3" size="sm">
            Fecha de creación:
          </Heading>
          <Text size={"sm"}>{fer}</Text>
        </HStack>
      </VStack>

      <HStack spacing={"5"} w={full} py={1} justifyContent={"flex-end"}>
        <Box as="span" color="gray.600" fontSize="sm">
          hace{" "}
          {formatDistanceToNow(cre, {
            locale: localEs,
          })}
        </Box>
        <NavLink
          href={`/admin/orders/[id]?s=${uid}&b=${uidBuy}`}
          as={`/admin/orders/${id}?s=${uid}&b=${uidBuy}`}
          name={`Verificar $${to}`}
          variant={"primary"}
          size={"xs"}
          textTransform={"uppercase"}
        />
      </HStack>
    </HStack>
  );
};

SaleScreen.propTypes = {
  item: PropTypes.object,
};

export default SaleScreen;
