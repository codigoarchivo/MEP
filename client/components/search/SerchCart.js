import React from "react";

import { DeleteIcon } from "@chakra-ui/icons";

import { useSelector } from "react-redux";

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

const SerchCart = () => {
  // selector
  const { activeSelectCart } = useSelector(({ product }) => product);
  // const { na, pr, cantidad, total } = activeSelectCart;
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
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td>25.4</Td>
            <Td>25.4</Td>
            <Td isNumeric>
              <DeleteIcon mx={5} cursor={"pointer"} />
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th textAlign={"right"}>Subtotal: 25$</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default SerchCart;
