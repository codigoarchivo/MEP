import React from "react";

import PropTypes from "prop-types";

import {
  Button,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

const CheckoutScreenAll = ({
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
}) => {
  // Breakpoints
  const { bordes, full } = Breakpoints();

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
      <HStack
        w={full}
        justifyContent={"space-between"}
        alignItems={"end"}
        borderBottom={bordes}
        p={2}
      >
        <VStack spacing={0}>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              {name}:
            </Heading>
            <Text size={"sm"}>{product.na}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              {quantity}:
            </Heading>
            <Text size={"sm"}>N°{product.cn}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              {unit}:
            </Heading>
            <Text size={"sm"}>${product.pr}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              {tax}:
            </Heading>
            <Text size={"sm"}>${product.pj}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              {price}:
            </Heading>
            <Text size={"sm"}>${product.in}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              Total:
            </Heading>
            <Text size={"sm"}>${product.cn * product.pr}</Text>
          </HStack>
        </VStack>

        <HStack spacing={"5"}>
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
      </HStack>
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
};

export default CheckoutScreenAll;
