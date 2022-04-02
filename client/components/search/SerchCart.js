import React, { useEffect, useRef } from "react";

import { DeleteIcon } from "@chakra-ui/icons";

import { useDispatch, useSelector } from "react-redux";

import {
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

const SerchCart = () => {
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const inc = useRef(0);
  // selector
  const { activeCartSelect } = useSelector(({ product }) => product);
  // sub
  activeCartSelect.map((item) => (inc.current += item.total));
  // TODO: Acomodar esta parte codigo
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    activeCartSelect.map((item) => (inc.current -= item.total));
  };

  return (
    <TableContainer w={"full"}>
      <Table variant="simple">
        <TableCaption>Carrito de Compras</TableCaption>
        <Thead>
          <Tr>
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
              <Th>Sub Total:${inc.current}</Th>
              <Th></Th>
            </>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default SerchCart;
