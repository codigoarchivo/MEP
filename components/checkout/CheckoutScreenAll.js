import React from "react";

import PropTypes from "prop-types";

import {
  Button,
  Heading,
  HStack,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import { Breakpoints } from "../../helpers/Breakpoints";

export const CheckoutScreenAll = ({
  product = {},
  process,
  name,
  quantity,
  tax,
  unit,
  price,
  sF,
  paid,
  pro,
  sal,
  push,
  locale,
}) => {
  // Breakpoints
  const { bordes, full, content3 } = Breakpoints();

  // despues de verificar el pago se puede ver los datos del vendedor
  const handleUser = () => {
    if (process !== false) {
      push({
        pathname: "/info/[uid]",
        query: {
          uid: sal,
        },
      });
    }
  };

  return (
    <>
      <Stack
        w={full}
        justifyContent={"space-between"}
        flexDirection={content3}
        alignItems={{ base: "start", sm: "flex-end" }}
        borderBottom={bordes}
      >
        <VStack w={full} spacing={0} overflow={"auto"}>
          {[
            {
              all: name,
              dat: locale === "en" ? product.na.en : product.na.es,
            },
            {
              all: quantity,
              dat: `N°${product.cn}`,
            },
            {
              all: unit,
              dat: `$${product.pr}`,
            },
            {
              all: price,
              dat: `$${product.pj}`,
            },
            {
              all: tax,
              dat: `$${product.in}`,
            },
          ].map(({ all, dat }, key) => (
            <HStack w={full} key={key}>
              <Heading as="h3" size="sm">
                {all}:
              </Heading>
              <Text size={"sm"}>{dat}</Text>
            </HStack>
          ))}
          <HStack w={full}>
            <Heading as="h3" size="sm">
              Total:
            </Heading>
            <Text size={"sm"}>${product.cn * product.pr}</Text>
          </HStack>
        </VStack>

        <HStack spacing={{ base: 1, md: 5 }}>
          <Button
            size={"xs"}
            fontWeight={"normal"}
            variant={"secondary"}
            w={"min-content"}
            disabled={process ? false : true}
            border={bordes}
            onClick={handleUser}
            textTransform={"uppercase"}
          >
            {sF}
          </Button>
          <Tag
            size={"md"}
            variant="outline"
            cursor={process ? "not-allowed" : "pointer"}
            colorScheme={process ? "green" : "blue"}
          >
            <TagLabel textTransform={"uppercase"}>
              {process ? paid : pro}
            </TagLabel>
            <TagRightIcon as={process ? UnlockIcon : LockIcon} />
          </Tag>
        </HStack>
      </Stack>
    </>
  );
};

CheckoutScreenAll.propTypes = {
  product: PropTypes.object,
  process: PropTypes.bool,
  name: PropTypes.string,
  quantity: PropTypes.string,
  tax: PropTypes.string,
  unit: PropTypes.string,
  price: PropTypes.string,
  sF: PropTypes.string,
  paid: PropTypes.string,
  pro: PropTypes.string,
  sal: PropTypes.string,
  locale: PropTypes.string,
  push: PropTypes.func,
};
