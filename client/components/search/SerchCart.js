import React, { useMemo, useRef } from "react";

import { DeleteIcon } from "@chakra-ui/icons";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { deleteProductCart } from "../../actions/product";

import SerchCartSave from "./SerchCartSave";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";

const SerchCart = () => {
  // Breakpoints
  const { bordes } = Breakpoints();
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const inc = useRef(0);
  // selector
  const { activeCartSelect, saveCartSelect } = useSelector(
    ({ product }) => product
  );
  // incrementa y encapsula información para evitar que se actualice 
  inc.current = activeCartSelect.reduce((total, item) => total + item.total, 0);
  // delete cart
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    activeCartSelect.map((item) => (inc.current -= item.total));
    Toast("Eliminado con exito", "error", 5000);
  };

  return (
    <>
      <TableContainer w={"full"} my={20} border={bordes}>
        <Table variant="simple">
          <TableCaption>Carrito de Compras</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Producto</Th>
              <Th>Precio</Th>
              <Th>Cantidad</Th>
              <Th>Total</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activeCartSelect.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <AspectRatio ratio={1} w={59} h={59} position={"relative"}>
                    <Image
                      src={item.im}
                      alt="Picture of the author"
                      layout="fill"
                      objectFit="contain"
                    />
                  </AspectRatio>
                </Td>
                <Td>{item.na}</Td>
                <Td>${item.pr}</Td>
                <Td>{item.cantidad}</Td>
                <Td>${item.total}</Td>
                <Td isNumeric>
                  <DeleteIcon
                    onClick={() => handleDeleteCart(item.id)}
                    mx={5}
                    cursor={"pointer"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th>Sub Total: ${inc.current}</Th>
                <Th></Th>
              </>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <TableContainer variant="striped" w={"full"} my={10} border={bordes}>
        <Table variant="simple">
          <TableCaption>Lista de deseos</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Producto</Th>
              <Th>Precio</Th>
              <Th>Disponible</Th>
              <Th>Cantidad</Th>
              <Th>Total</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {saveCartSelect.map((item) => (
              <SerchCartSave key={item.id} {...item} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SerchCart;
