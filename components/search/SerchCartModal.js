import React from "react";

import { db } from "../../firebase/config";

import { addDoc, collection } from "firebase/firestore";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { addDays } from "date-fns";

import { dbProductEdit } from "../../data/dbProducts";

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

import { activeProduct, closeActive } from "../../actions/product";

const SerchCartModal = ({ isOpen, onClose }) => {
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
      process: false,
      close: false,
      lim: addDays(Date.now(), 3),
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

  const confirmSale = async (e) => {
    e.preventDefault();

    const newData = await data.map(async (item) => {
      await dbProductEdit(item.product.id, "dbProEditOne", item.product.cnr);

      const { id } = await addDoc(collection(db, "users", a.uid, "buys"), {
        ...item,
      });

      return {
        ...item,
        id: (item["id"] = id),
      };
    });

    dispatch(activeProduct(newData));

    dispatch(closeActive());

    // save cart
    await router.push({
      pathname: "/checkout/[uid]",
      query: {
        uid: a.uid,
      },
    });
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
