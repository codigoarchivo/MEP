import React, { useEffect, useRef } from "react";

import Image from "next/image";

import {
  AspectRatio,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";
import { validPago } from "../../actions/checkout";

const SaleModal = ({
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
  // id del buy product
  idThree,
  // product
  product,
  // buy
  buy,
  // sale
  sale,
  // información del pago del producto
  info,
}) => {
  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);

  // router
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { content5, full } = Breakpoints();

  // buy
  const { na: naC } = buy;

  // handleLiberate
  const handleLiberate = (e) => {
    e.preventDefault();
    const data = {
      idThree,
      
      
    }
    dispatch(validPago(data));
    onClose();
  };

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
      <Modal
        size={"lg"}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform={"uppercase"}>
            Comprador: {naC}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack
              flexDirection={content5}
              spacing={0}
              w={full}
              justifyContent={"space-around"}
            >
              <VStack w={full} spacing={0}>
                <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
                  Información de la transferencia
                </Heading>
                <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
                  <HStack justifyContent={"space-between"}>
                    {info?.imp && (
                      <AspectRatio
                        border={bordes}
                        ratio={1}
                        w={"full"}
                        h={300}
                        position={"relative"}
                      >
                        <Image
                          src={info?.imp}
                          alt="Recibo pago"
                          layout="fill"
                          objectFit="contain"
                        />
                      </AspectRatio>
                    )}
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Pago a nombre: </Text>
                    <Text>{info?.nap}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Referencia: </Text>
                    <Text>{info?.ref}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Fecha: </Text>
                    <Text>{info?.fer}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Correo: </Text>
                    <Text>{info?.cor}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Tipo Pago: </Text>
                    <Text>{info?.tip.slice(1, 50)}</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"black"}>Información adicional: </Text>
                    <Text>{info?.inf}</Text>
                  </HStack>
                  <HStack w={"full"} justifyContent="flex-end" spacing={10}>
                    <Button variant={"secondary"} onClick={onClose}>
                      Close
                    </Button>
                    <Button onClick={handleLiberate} variant={"primary"} type="submit" ml={3}>
                      Liberar Proceso
                    </Button>
                  </HStack>
                </Stack>
              </VStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaleModal;
