import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

// import { addDays, formatDistance, getUnixTime, subDays } from "date-fns";

const CheckModal = ({
  isOpen,
  onOpen,
  onClose,
  initialRef,
  backgroundColor,
  leftIcon,
  variant,
  size,
  border,
  w,
  disabled,
  nameButton,
  bordes,
  product,
  buy,
  sale,
}) => {
  // useRef
  const cat = useRef(0);
  // useRef
  const resumen = useRef(0);
  // useRef
  const comision = useRef(0);

  //   TODO determinar limite tiempo

  //   const e = formatDistance(subDays(new Date(), 1), new Date(), {
  //     addSuffix: true,
  //   });
  //   console.log(e);
  // buy
  const { na: naC } = buy;
  // sale
  const { na: naV, te, co, dt, id } = sale;
  // product
  const { cn, pr, uid, id: idP, na: naP } = product;

  useEffect(() => {
    // cantidad de productos
    cat.current += Number(cn);
    // total de productos a comprar
    resumen.current = Number(cn) * Number(pr);
    // comision 20% al comprador
    comision.current = resumen.current * 0.2;
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor={backgroundColor}
        leftIcon={leftIcon}
        variant={variant}
        size={size}
        border={border}
        w={w}
        disabled={disabled}
      >
        {nameButton}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comprador: {naC}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack border={bordes} p={5} spacing={3} mb={2}>
              <Heading size={"sm"} border={bordes} p={2}>
                Información del vendedor
              </Heading>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Nombre: </Text>
                <Text>{naV}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Telefono: </Text>
                <Text>{te}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Correo: </Text>
                <Text>{co}</Text>
              </HStack>
              <VStack>
                <Text w={"full"} fontWeight={"black"}>
                  Información Adicional:{" "}
                </Text>
                <Text w={"full"}>{dt}</Text>
              </VStack>
            </Stack>
            <Stack border={bordes} p={5} spacing={3}>
              <Heading size={"sm"} border={bordes} p={2}>
                Información del producto
              </Heading>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Nombre: </Text>
                <Text>{naP}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Precio: </Text>
                <Text>${pr}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Cantidad: </Text>
                <Text>{cat.current}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>comision 20%: </Text>
                <Text>${comision.current}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Solo pagar vendedor: </Text>
                <Text>${resumen.current}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"black"}>Total: </Text>
                <Text>${comision.current + resumen.current}</Text>
              </HStack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <HStack w={"full"} spacing={10} alignItems={"flex-start"}>
              <VStack>
                <Heading w={"full"} size={"sm"}>
                  Pago Individual
                </Heading>
                <Button size={"sm"} w={"full"} variant={"primary"}>
                  Page ${resumen.current} al vendedor
                </Button>
                <Button size={"sm"} w={"full"} variant={"primary"}>
                  Page ${comision.current} a la tienda
                </Button>
              </VStack>
              <VStack>
                <Heading w={"full"} size={"sm"}>
                  Pago Unico
                </Heading>
                <Button size={"sm"} w={"full"} variant={"primary"}>
                  Page ${resumen.current + comision.current} a la tienda
                </Button>
              </VStack>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckModal;
