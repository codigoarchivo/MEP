import React from "react";

import {
  Box,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";
import localEn from "date-fns/locale/en-US";

import Breakpoints from "../../helpers/Breakpoints";

import NavLink from "../../utils/Navlink";

const SaleScreenAll = ({
  item = {},
  name,
  mail,
  creation,
  verify,
  locale,
  paid,
}) => {
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  const { cre, process, fer, co, nap, id } = item;

  const { to } = item.product;
  return (
    <Stack
      w={full}
      flexDirection={content5}
      alignItems={"flex-end"}
      borderBottom={bordes}
      p={2}
    >
      <VStack w={full} spacing={0}>
        {[
          {
            all: name,
            dat: nap,
          },
          {
            all: mail,
            dat: co,
          },
          {
            all: creation,
            dat: fer,
          },
        ].map(({ all, dat }, key) => (
          <HStack w={full} key={key}>
            <Heading as="h3" size="sm">
              {all}:
            </Heading>
            <Text size={"sm"}>{dat}</Text>
          </HStack>
        ))}
      </VStack>

      <HStack spacing={"5"} w={full} py={1} justifyContent={"flex-end"}>
        {process === true ? (
          <Tag
            textTransform={"uppercase"}
            size={"sm"}
            variant="solid"
            colorScheme="teal"
          >
            {paid}
          </Tag>
        ) : (
          <Box as="span" color="gray.600" fontSize="sm">
            {locale === "es" && "hace"}{" "}
            {formatDistanceToNow(cre, {
              locale: locale === "en" ? localEn : localEs,
            })}
          </Box>
        )}

        <NavLink
          href={`/admin/orders/[id]`}
          as={`/admin/orders/${id}`}
          name={`${verify} $${to}`}
          variant={"primary"}
          size={"xs"}
          textTransform={"uppercase"}
        />
      </HStack>
    </Stack>
  );
};

SaleScreenAll.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string,
  mail: PropTypes.string,
  creation: PropTypes.string,
  verify: PropTypes.string,
};

export default SaleScreenAll;
