import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { DeleteIcon } from "@chakra-ui/icons";

import Image from "next/image";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
  Button,
  Heading,
  HStack,
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
  closeActive,
  deleteProductCart,
  saveSale,
} from "../../actions/product";

import SerchCartSave from "./SerchCartSave";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import { addDays } from "date-fns";

const SerchCart = () => {
  // dispatch
  const router = useRouter();
  // Breakpoints
  const { bordes, full } = Breakpoints();
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const inc = useRef(0);
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
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
  // si la lista esta llena sera false podra comprar
  const [listUser, setListUser] = useState(true);
  // proceso de compra
  const [proceso, setProceso] = useState([]);

  useEffect(async () => {
    setListUser(false);

    activeCartSelect.map(async (item) => {
      const product = {
        // raiting del producto
        rat: item.rat,
        // id del producto
        id: item.id,
        // catidad del producto
        cn: item.cn,
        // nombre del producto
        na: item.na,
        // uid del  vendedor
        uid: item.uid,
        // precio del producto
        pr: Number(item.pr),
        //  total del producto a comprar
        to: item.cn * Number(item.pr),
        // porcentaje de ganancia 5%
        in: item.cn * Number(item.pr) * 0.05,
      };

      setProceso((proceso) => [
        ...proceso,
        {
          // id del producto
          id: "",
          // uid de usuario que compro
          uidCom: a.uid,
          // cuando la persona culmino la compra y califico el vendedor pasa a true
          close: false,
          // proceso de compra se hizo con exito pasa a true
          process: false,
          // informacion del producto
          product,
          // fecha limite de la compra
          lim: addDays(Date.now(), 3),
        },
      ]);
    });
  }, []);

  // save cart
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
        // success
        Swal.fire("Procesado!", "Si, Gracias por su Compra.", "success");
        // save cart
        dispatch(saveSale(proceso));
        // ir checkout
        router.push("/search/checkout");
        // limpiar carrito
        dispatch(closeActive());
      }
    });
  };

  const handleInfo = () => {
    router.push({
      pathname: "/search/info/[info]",
      query: { info: a?.uid },
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
            <HStack w={full}>
              <Heading w={full} size={"md"}>
                Total:
              </Heading>
              <Button
                w={full}
                variant={"primary"}
                size={"xs"}
                onClick={handleInfo}
              >
                {"{Datos}"}
              </Button>
            </HStack>

            <Heading w={full}>{inc.current}$</Heading>

            <Button
              variant={"primary"}
              w={full}
              onClick={handleCheckout}
              disabled={listUser}
              size={listUser ? "xs" : "md"}
            >
              {listUser ? "Agregar {Datos} adicional" : "Pagar"}
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
