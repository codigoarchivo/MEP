import React, { useRef } from "react";

import { useRouter } from "next/router";

import { DeleteIcon } from "@chakra-ui/icons";

import Image from "next/image";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import {
  Flex,
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
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { dbProducts } from "../../data/dbProducts";

const SerchCart = () => {
  // useRouter
  const router = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const {
    activeCartSelect: active = [],
    saveCartSelect: save = [],
  } = useSelector(({ product }) => product);
  // selector
  const { list = [] } = useSelector(({ category }) => category);
  // Breakpoints
  const { bordes, full } = Breakpoints();
  // useRef
  const inc = useRef(0);

  // incrementa y encapsula información para evitar que se actualice
  inc.current = active.reduce((total, item) => (total += item.cn * item.pr), 0);

  // delete cart
  const handleDeleteCart = (id) => {
    dispatch(deleteProductCart(id));
    // dcr
    active.map((item) => (inc.current -= item.pr));
    Toast("Eliminado con exito", "error", 5000);
  };

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
        let process = [];
        active.forEach(async function (item) {
          const data = {
            lim: addDays(Date.now(), 3),
            process: false,
            close: false,
            product: {
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
              pr: item.pr,
              //  total del producto a comprar
              to: item.cn * item.pr,
              // porcentaje de ganancia para cliente
              in: (item.pj * (item.cn * item.pr)) / 100,
              // porcentaje de ganancia para vendedor
              pj: item.cn * item.pr - (item.pj * (item.cn * item.pr)) / 100,
            },
          };

          const { id } = await addDoc(
            collection(db, "users", a.uid, "buys"),
            ...data
          );
          // resta cantidad de productos
          await dbProducts(item.id, "dbProEight", item.cn - 1);
            // TODO: cn averiguar cuanto llegan
          process.push({
            ...data,
            id: (item["id"] = id),
          });
        });

        // save cart
        dispatch(saveSale(process));

        // TODO: falta agregar disminuir el stock

        // success
        Swal.fire("Procesado!", "Si, Gracias por su Compra.", "success");

        // ir checkout
        router.push({
          pathname: "/checkout",
          query: {
            checkout: a.uid,
          },
        });
        // limpiar carrito
        dispatch(closeActive());
      }
    });
  };

  return (
    <>
      <Stack flexDirection={"row"} w={full} spacing={0}>
        {!active[0] ? (
          <Heading my={20} w={full} textAlign={"center"}>
            Carrito esta Vacio
          </Heading>
        ) : (
          <>
            <TableContainer w={"70%"} px={5} my={20} border={bordes}>
              <Table variant="striped" colorScheme="brand">
                <TableCaption>Carrito de Compras</TableCaption>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {active.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        <HStack>
                          <Flex position={"relative"}>
                            <Image
                              src={
                                item.im ||
                                "https://via.placeholder.com/155.png?text=Imagen"
                              }
                              alt={item.na}
                              width={155}
                              height={155}
                              objectFit="cover"
                              objectPosition="center"
                            />
                          </Flex>
                          <VStack spacing={1}>
                            <HStack w={full}>
                              <Heading as="h3" size="sm">
                                Nombre:
                              </Heading>
                              <Text size={"sm"}>{item.na}</Text>
                            </HStack>
                            <HStack w={full}>
                              <Heading as="h3" size="sm">
                                Descripción:
                              </Heading>
                              <Text size={"sm"}>{item.ds}</Text>
                            </HStack>
                            <HStack w={full}>
                              <Heading as="h3" size="sm">
                                Precio:
                              </Heading>
                              <Text size={"sm"}>${item.pr}</Text>
                            </HStack>
                            <HStack w={full}>
                              <Heading as="h3" size="sm">
                                Cantidad:
                              </Heading>
                              <Text size={"sm"}>N°{item.cn}</Text>
                            </HStack>
                            <HStack w={full}>
                              <Heading as="h3" size="sm">
                                Categoria:
                              </Heading>
                              <Text size={"sm"}>
                                {list.map(({ id, na }) => id === item.ct && na)}
                              </Text>
                            </HStack>
                            <HStack w={full}>
                              <Heading as="h3" size="sm">
                                Tipo:
                              </Heading>
                              <Text size={"sm"}>{item.ps}</Text>
                            </HStack>
                            <HStack w={full}>
                              <Heading as="h3" size="sm">
                                Sub Total:
                              </Heading>
                              <Text size={"sm"}>${item.cn * item.pr}</Text>
                            </HStack>
                          </VStack>
                        </HStack>
                      </Td>
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
            <VStack py={20} px={5} spacing={0} w={"30%"}>
              <Stack w={full} p={3} spacing={5} border={bordes}>
                <HStack w={full}>
                  <Heading w={full} size={"md"}>
                    Total:
                  </Heading>
                  <Heading w={full}>{inc.current}$</Heading>
                </HStack>

                <Button
                  variant={"primary"}
                  w={full}
                  onClick={handleCheckout}
                  size={"md"}
                >
                  {"Pagar"}
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
          </>
        )}
      </Stack>
      {!save[0] ? (
        <></>
      ) : (
        <TableContainer variant="striped" w={full} my={10} border={bordes}>
          <Table variant="simple">
            <TableCaption>Lista de deseos</TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th textAlign={"center"}>Cantidad</Th>
                <Th>Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {save.map((item) => (
                <SerchCartSave key={item.id} {...item} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default SerchCart;
