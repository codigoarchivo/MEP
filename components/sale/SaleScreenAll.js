import React from "react";

import { Box, Heading, HStack, Tag, Text, VStack } from "@chakra-ui/react";

import PropTypes from "prop-types";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";

import Breakpoints from "../../helpers/Breakpoints";

import NavLink from "../../utils/Navlink";

const SaleScreenAll = ({ item = {} }) => {
  // Breakpoints
  const { bordes, full } = Breakpoints();

  const { cre, process, fer, co, nap, id } = item;

  const { to } = item.product;
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
        {process === true ? (
          <Tag textTransform={"uppercase"} size={"sm"} variant="solid" colorScheme="teal">
            Pagado
          </Tag>
        ) : (
          <Box as="span" color="gray.600" fontSize="sm">
            hace{" "}
            {formatDistanceToNow(cre, {
              locale: localEs,
            })}
          </Box>
        )}

        <NavLink
          href={`/sale/[id]`}
          as={`/sale/${id}`}
          name={`Verificar $${to}`}
          variant={"primary"}
          size={"xs"}
          textTransform={"uppercase"}
        />
      </HStack>
    </HStack>
  );
};

SaleScreenAll.propTypes = {
  item: PropTypes.object,
};

export default SaleScreenAll;
