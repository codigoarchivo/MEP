import React from "react";

import PropTypes from "prop-types";

import Image from "next/image";

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const Salemodal = ({
  imgs,
  receipt,
  close,
  picture,
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
      >
        {receipt}
      </Button>

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box w={"full"} position={"relative"} textAlign="center">
              <Image
                src={
                  imgs || `https://via.placeholder.com/1000.png?text=${picture}`
                }
                alt="Recibo pago"
                width={1000}
                height={1000}
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>{close}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

Salemodal.propTypes = {
  imgs: PropTypes.string,
  receipt: PropTypes.string,
  close: PropTypes.string,
  picture: PropTypes.string,
  textTransform: PropTypes.string,
};
