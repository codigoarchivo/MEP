import React, { useState } from "react";

import { useRouter } from "next/router";

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

const SerchCartModal = ({ isOpen, onClose }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { activeCartSelect: active = [] } = useSelector(
    ({ process }) => process
  );
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);

  const data = active.map((item) => {
    return {
      // uid del comprador
      uid: a.uid,
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
    };
  });

  const confirmSale = () => {
    // save cart
    dispatch(saveSale(data));

    Toast("Gracias por su compra", "success", 5000);

    router.push(`/checkout?q=${a.uid}`);
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
          <ModalBody>
            <Box textAlign={"center"} mb={10} w={"full"}>
              <QuestionOutlineIcon w={20} h={20} color="red.500" />
            </Box>

            <Heading size={"lg"}>No podrás revertir esto!,</Heading>
            <Text>¿Estas seguro de que quieres realizar la compra?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant={"secondary"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                confirmSale(), setOverlay(<OverlayOne />);
              }}
              mr={3}
            >
              Comprar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SerchCartModal;
