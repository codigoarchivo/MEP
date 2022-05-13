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
import UserOne from "../../helpers/UserOne";

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
  const { activeSelect } = useSelector(({ auth }) => auth);
  const a = activeSelect;
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
    // comprador

    const { dataUser } = await UserOne(a?.uid.toString());
    const datU = dataUser;
    if (
      datU?.na === undefined ||
      datU?.te === undefined ||
      datU?.co === undefined ||
      datU?.dt === undefined
    ) {
      setListUser(true);
    } else {
      setListUser(false);

      activeCartSelect.map(async (item) => {
        const { dataUser } = await UserOne(item?.uid.toString());
        const datV = dataUser;
        if (dataUser !== undefined) {
          setProceso((proceso) => [
            ...proceso,
            {
              // uid del comprador
              uidC: a?.uid.toString(),
              // informacion del vendedor
              sale: datV,
              // informacion del comprador
              buy: datU,
              // proceso
              process: true,
              // informacion del producto
              product: item,
            },
          ]);
        }
      });
    }
  }, []);
  console.log(proceso);
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
        Swal.fire("Procesado!", "Si, Gracias por su Compra.", "success");
        dispatch(saveSale(proceso));
        router.push("/search/checkout");
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
