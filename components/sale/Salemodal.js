import React from "react";

import PropTypes from "prop-types";

import Image from "next/image";

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";


const Salemodal = ({ imgs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant={"primary"} onClick={onOpen} m={4}>
        Ver Recibo
      </Button>

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recibo de Pago</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"full"} position={"relative"} textAlign="center">
              <Image
                src={imgs || "https://via.placeholder.com/1000.png?text=Imagen"}
                alt="Recibo pago"
                width={1000}
                height={1000}
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

Salemodal.propTypes = {
  imgs: PropTypes.string,
}

export default Salemodal;
