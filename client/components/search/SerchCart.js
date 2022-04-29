import React, { useRef } from "react";

import { useRouter } from "next/router";

import { DeleteIcon } from "@chakra-ui/icons";

import Image from "next/image";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
  Button,
  Heading,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import {
  activeProduct,
  closeActive,
  deleteProductCart,
} from "../../actions/product";

import SerchCartSave from "./SerchCartSave";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

const SerchCart = () => {
  // dispatch
  const router = useRouter();
  // Breakpoints
  const { bordes, full } = Breakpoints();
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const inc = useRef(0);
  // useRef
  const resumen = useRef([]);
  // selector
  const { activeCartSelect, saveCartSelect } = useSelector(
    ({ product }) => product
  );
  // incrementa y encapsula información para evitar que se actualice
  inc.current = activeCartSelect.reduce(
    (total, item) => (total += Number(item.cn) * Number(item.pr)),
    0
  );
  // delete cart
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    activeCartSelect.map((item) => (inc.current -= Number(item.pr)));
    Toast("Eliminado con exito", "error", 5000);
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffc301",
      cancelButtonColor: "#00020f",
      confirmButtonText: "Aceptar!",
    }).then((result) => {
      if (result.isConfirmed) {
        activeCartSelect.map((item) =>
          resumen.current.push({
            id: item.id,
            cn: item.cn,
            pr: item.pr,
            na: item.na,
            ds: item.ds,
            im: item.im,
            ct: item.ct,
            es: item.es,
            dt: item.dt,
            rat: item.rat,
          })
        );
        Swal.fire("Procesado!", "Si, Gracias por su Compra.", "success");
        dispatch(activeProduct(resumen.current));
        router.push("/search/checkout");
        dispatch(closeActive());
      }
    });
  };

  return (
    <>
      <Stack flexDirection={"row"} w={full}>
        <TableContainer w={"75%"} my={20} border={bordes}>
          <Table variant="simple">
            <TableCaption>Carrito de Compras</TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Producto</Th>
                <Th>Precio</Th>
                <Th>Cantidad</Th>
                <Th>Sub Total</Th>
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
                  <Td>{item.cn}</Td>
                  <Td>${item.cn * item.pr}</Td>
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
          </Table>
        </TableContainer>
        <VStack py={20} px={1} spacing={0} w={"25%"} style={{ marginTop: 0 }}>
          <Stack w={full} p={3} spacing={5} border={bordes}>
            <Heading w={full} size={"md"}>
              Total:
            </Heading>
            <Heading w={full}>{inc.current}$</Heading>

            <Button variant={"primary"} w={full} onClick={handleCheckout}>
              Pagar
            </Button>
            <Text>
              Si quiere seguir comprando puede hacer{" "}
              <Button
                onClick={() => router.push("/search")}
                textTransform={"uppercase"}
                variant={"secondary"}
              >
                clik aqui
              </Button>{" "}
            </Text>
          </Stack>
        </VStack>
      </Stack>

      <TableContainer variant="striped" w={full} my={10} border={bordes}>
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
