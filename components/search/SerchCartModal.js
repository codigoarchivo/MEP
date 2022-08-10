import React, { useMemo, useState } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { QuestionOutlineIcon } from "@chakra-ui/icons";

import { addDays, getUnixTime } from "date-fns";

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

import { Toast } from "../../helpers/Toast";

import { ModeColor } from "../../helpers/ModeColor";

export const SerchCartModal = ({
  isOpen,
  onClose,
  locale,
  close,
  toBuy,
  del,
  push,
  en,
  es,
}) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { activeCartSelect: active = [] } = useSelector(({ cart }) => cart);
  // useDispatch
  const dispatch = useDispatch();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);

  const data = useMemo(
    () =>
      active.map((item) => ({
        process: false,
        close: false,
        lim: getUnixTime(addDays(new Date(), 3)),
        product: {
          // id del producto
          id: item.id,
          // catidad del producto seleccionado
          cn: item.cn,
          // catidad restada producto en stock
          cnr: item.cnr !== 0 ? item.cnr : 1,
          // nombre del producto
          na: item.na,
          // uid del  vendedor
          uid: item.uid,
          // precio del producto
          pr: item.pr,
          //  total del producto a comprar
          to: item.cn * item.pr,
          //? porcentaje de ganancia para empresa
          in: (item.pj * (item.cn * item.pr)) / 100,
          //? porcentaje de ganancia para vendedor
          pj: item.cn * item.pr - (item.pj * (item.cn * item.pr)) / 100,
        },
      })),
    [active]
  );

  const confirmSale = () => {
    const u = a.uid;
    // save cart
    dispatch(saveSale(data, del, u));

    Toast(locale === "en-US" ? en.cart.cF : es.cart.cF, "success", 5000);

    push(`/checkout?q=${a.uid}`);
  };

  const { modelC } = ModeColor();
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
          <ModalHeader color={modelC}>{a.displayName}</ModalHeader>
          <ModalCloseButton color={modelC} />
          <ModalBody textAlign={"center"}>
            <Box textAlign={"center"} mb={10} w={"full"}>
              <QuestionOutlineIcon w={20} h={20} color="red.500" />
            </Box>

            <Heading size={"md"} mb={3}>
              {locale === "en-US" ? en.cart.cD : es.cart.cD},
            </Heading>
            <Text>{locale === "en-US" ? en.cart.cE : es.cart.cE}</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant={"tertiary"} mr={3} onClick={onClose}>
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
  locale: PropTypes.string.isRequired,
  del: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  toBuy: PropTypes.string.isRequired,
  del: PropTypes.string,
  en: PropTypes.object,
  es: PropTypes.object,
  push: PropTypes.func,
};
