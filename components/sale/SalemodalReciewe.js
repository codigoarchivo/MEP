import React from "react";

import PropTypes from "prop-types";

import Image from "next/image";

import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

export const SalemodalReciewe = ({
  styles,
  bordes,
  locale,
  es,
  en,
  item,
  receipt,
  close,
  textTransform = "lowercase",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        w={{ base: "full", md: "min-content" }}
        variant={"primary"}
        size={"xs"}
        fontSize={"small"}
        onClick={onOpen}
        textTransform={textTransform}
        style={{ ...styles }}
      >
        {receipt}
      </Button>

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack
              h={"min-content"}
              w={"full"}
              spacing={5}
              p={{ base: 3, sm: 5 }}
            >
              <Heading
                textTransform={"uppercase"}
                w={"full"}
                mb={5}
                size={"sm"}
              >
                {locale === "en" ? en.historySale.sF : es.historySale.sF}
              </Heading>
              <Stack w={"full"} spacing={5} overflow={"auto"}>
                {[
                  {
                    nombre: locale === "en" ? en.name : es.name,
                    Valor: item.nap,
                  },
                  {
                    nombre: locale === "en" ? en.reference : es.reference,
                    Valor: item.ref,
                  },
                  {
                    nombre: locale === "en" ? en.payment : es.payment,
                    Valor: item.fer,
                  },
                  {
                    nombre: locale === "en" ? en.mail : es.mail,
                    Valor: item.co,
                  },
                ].map(({ nombre, Valor }, key) => (
                  <HStack
                    py={1}
                    key={key}
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>{nombre}: </Text>
                    <Text>{Valor}</Text>
                  </HStack>
                ))}
              </Stack>{" "}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>{close}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

SalemodalReciewe.propTypes = {
  receipt: PropTypes.string,
  close: PropTypes.string,
  bordes: PropTypes.string,
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
  item: PropTypes.object,
};
