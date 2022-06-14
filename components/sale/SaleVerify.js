import React from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import {
  AspectRatio,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";

import { validPago } from "../../actions/checkout";

import Toast from "../../helpers/Toast";

const SaleModal = ({
  bordes,
  // id del referencia product
  idThree,
  // product
  product,
  // sale
  sale = {},
  // información del pago del producto
  referencia = {},
}) => {
  // dispatch
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { full } = Breakpoints();

  // handleLiberate
  const handleLiberate = (e) => {
    e.preventDefault();
    const dataL = {
      co: "puede ser una Correo",
      dt: "puede ser una fecha",
      na: "puede ser un nombre",
      te: "puede ser un telefono",
    };
    // Todo agregar los datos en duro y agregar los datos del vendedor
    const sales = sale ? dataL : sale;
    const data = {
      // id del la venta - compra
      idThree,
      // información para el vendedor
      buy: referencia.uidBuy,
      // información para el comprador
      sale: sales,
      // información del pago del producto
      product,
    };
    dispatch(validPago(data));
    // pago verificado
    Toast("Pago ha sido verificado", "success", 5000);

    router.push("/history/sale");
  };

  const closeVerify = () => {
    router.push("/history/sale");
  };

  return (
    <>
      <VStack w={full} spacing={0} mr={5}>
        <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
          Información de la transferencia
        </Heading>
        <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
          <HStack justifyContent={"space-between"}>
            <AspectRatio
              border={bordes}
              ratio={1}
              w={"full"}
              h={300}
              position={"relative"}
            >
              <Image
                src={referencia?.imp}
                alt="Recibo pago"
                layout="fill"
                objectFit="contain"
              />
            </AspectRatio>
          </HStack>
          <VStack w={full} spacing={0}>
            <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
              Información de la venta
            </Heading>
            <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Nombre: </Text>
                <Text>{product.na}</Text>
              </HStack>

              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Cantidad: </Text>
                <Text>{product.cn}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Precio: </Text>
                <Text>${product.pr}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Total reflejado: </Text>
                <Text>${product.to}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} borderBottom={bordes}>
                <Text fontWeight={"black"}>Comision: </Text>
                <Text>${product.in}</Text>
              </HStack>
            </Stack>
          </VStack>

          <chakra.form onSubmit={handleLiberate}>
            <HStack mt={10} w={"full"} justifyContent="flex-end" spacing={10}>
              <Button variant={"secondary"} onClick={closeVerify}>
                Close
              </Button>
              <Button variant={"primary"} type="submit" ml={3}>
                Liberar Proceso
              </Button>
            </HStack>
          </chakra.form>
        </Stack>
      </VStack>
      <Stack w={full} spacing={10}>
        <VStack w={full} spacing={0}>
          <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
            Información del cliente
          </Heading>
          <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Nombre: </Text>
              <Text>{referencia.na}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Telefono: </Text>
              <Text>{referencia.te}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Correo: </Text>
              <Text>{referencia.co}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Información adicional: </Text>
              <Text>{referencia.inf}</Text>
            </HStack>
          </Stack>
        </VStack>
        <VStack w={full} spacing={0}>
          <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
            Información de la transferencia
          </Heading>
          <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Nombre: </Text>
              <Text>{referencia.nap}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Referencia: </Text>
              <Text>{referencia.ref}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Fecha: </Text>
              <Text>{referencia.fer}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Correo: </Text>
              <Text>{referencia.cor}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Cantidad: </Text>
              <Text>{product.cn}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Total reflejado: </Text>
              <Text>${product.to}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Comision: </Text>
              <Text>${product.in}</Text>
            </HStack>

            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Información adicional: </Text>
              <Text>{referencia.inf}</Text>
            </HStack>
          </Stack>
        </VStack>
      </Stack>
    </>
  );
};

export default SaleModal;
