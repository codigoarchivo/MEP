import React, { useState } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { QuestionOutlineIcon } from "@chakra-ui/icons";

import { addDays } from "date-fns";

import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { saveSale } from "../../actions/product";

import Toast from "../../helpers/Toast";

const SerchCartModal = ({
  isOpen,
  onClose,
  cD,
  cE,
  cF,
  close,
  toBuy,
  del,
  push,
}) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { activeCartSelect: active = [] } = useSelector(
    ({ process }) => process
  );
  // useDispatch
  const dispatch = useDispatch();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);

  const data = active.map((item) => ({
    // uid del comprador
    buy: a.uid,
    process: false,
    close: false,
    lim: addDays(Date.now(), 3),
    cre: Date.now(),
    product: {
      // raiting del producto
      rat: item.rat,
      // id del producto
      id: item.id,
      // catidad del producto seleccionado
      cn: item.cn,
      // catidad restada producto en stock
      cnr: item.cnr !== 1 ? item.cnr - item.cn : 1,
      // nombre del producto
      na: item.na,
      // uid del  vendedor
      uid: item.uid,
      // precio del producto
      pr: item.pr,
      //  total del producto a comprar
      to: item.cn * item.pr,
      // porcentaje de ganancia para cliente
      in: (item.pj * (item.cn * item.pr)) / 100,
      // porcentaje de ganancia para vendedor
      pj: item.cn * item.pr - (item.pj * (item.cn * item.pr)) / 100,
    },
  }));

  const confirmSale = () => {
    // save cart
    dispatch(saveSale(data, del));

    Toast(cF, "success", 5000);

    push(`/checkout?q=${a.uid}`);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{a.displayName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Box textAlign={"center"} mb={10} w={"full"}>
              <QuestionOutlineIcon w={20} h={20} color="red.500" />
            </Box>

            <Heading size={"md"} mb={3}>
              {cD},
            </Heading>
            <Text>{cE}</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant={"secondary"} mr={3} onClick={onClose}>
              {close}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                confirmSale(), setOverlay(<OverlayOne />);
              }}
              mr={3}
            >
              {toBuy}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

SerchCartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cD: PropTypes.string.isRequired,
  cE: PropTypes.string.isRequired,
  cF: PropTypes.string.isRequired,
  del: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  toBuy: PropTypes.string.isRequired,
  del: PropTypes.object,
  push: PropTypes.func,
};

export default SerchCartModal;
