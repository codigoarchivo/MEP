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

const Salemodal = ({ imgs, receipt, close, picture }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant={"primary"} onClick={onOpen} m={4}>
        {receipt}
      </Button>

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={onClose} />
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
};

export default Salemodal;
