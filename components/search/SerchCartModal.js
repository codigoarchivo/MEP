import React from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { addDays } from "date-fns";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { closeActive, saveSale } from "../../actions/product";
import { dbProductEdit } from "../../data/dbProducts";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const SerchCartModal = ({ isOpen, onOpen, onClose }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { activeCartSelect: active = [] } = useSelector(
    ({ product }) => product
  );
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();

  const data = active.map((item) => {
    return {
      lim: addDays(Date.now(), 3),
      process: false,
      close: false,
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

  const confirmSale = (e) => {
    e.preventDefault();

    data.forEach(
      async ({ product }) =>
        await dbProductEdit(product.id, "dbProEditOne", product.cnr)
    );

    dispatch(saveSale(data, a.uid));

    // save cart
    setTimeout(() => {
      router.push({
        pathname: "/checkout/[uid]",
        query: {
          uid: a.uid,
        },
      });
      dispatch(closeActive());
    }, 1000);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={confirmSale}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>No podrás revertir esto!,</h1>
            <p>¿Estas seguro de que quieres realizar la compra?</p>
          </ModalBody>

          <ModalFooter>
            <Button variant="primary" type="submit" onClick={onClose}>
              Comprar
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SerchCartModal;
