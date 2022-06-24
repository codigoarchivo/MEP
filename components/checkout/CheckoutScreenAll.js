import React from "react";

import { useRouter } from "next/router";

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

const CheckoutScreenAll = ({ product = {}, process, id, lim, count }) => {
  const router = useRouter();
  // Breakpoints
  const { bordes, full } = Breakpoints();

  // envia el recibo del pago a la base de datos
  const handleVerify = () => {
    router.push({
      pathname: "/verify/[id]",
      query: {
        id,
      },
    });
  };

  // despues de verificar el pago se puede ver los datos del vendedor
  const handleUser = () => {
    if (process !== false) {
      router.push({
        pathname: "/info/[uid]",
        query: {
          uid: product.uid,
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
              Nombre:
            </Heading>
            <Text size={"sm"}>{product.na}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              Cantidad:
            </Heading>
            <Text size={"sm"}>N°{product.cn}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              Precio:
            </Heading>
            <Text size={"sm"}>${product.pr}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              Inpuesto:
            </Heading>
            <Text size={"sm"}>${product.pj}</Text>
          </HStack>
          <HStack w={full}>
            <Heading as="h3" size="sm">
              Precio Unitario:
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
            Datos del vendedor
          </Button>
          <Tag
            size={"md"}
            variant="outline"
            cursor={process ? "not-allowed" : "pointer"}
            colorScheme={process ? "green" : "blue"}
          >
            <TagLabel textTransform={"uppercase"}>
              {process ? "Pagado" : "Proceso"}
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
  id: PropTypes.string,
  lim: PropTypes.object,
  count: PropTypes.number,
};

export default CheckoutScreenAll;
