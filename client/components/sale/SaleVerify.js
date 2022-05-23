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
  // id del buy product
  idThree,
  // product
  product,
  // buy
  buy,
  // sale
  sale,
  // información del pago del producto
  info,
}) => {
  // dispatch
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { full } = Breakpoints();

  // buy
  const { id, na: naC, co: coC, te: teC, dt: dtC } = buy;

  const { in: incre, to, uid } = product;

  const { na, co, te, dt } = sale;

  // handleLiberate
  const handleLiberate = (e) => {
    e.preventDefault();

    const data = {
      // proceso de pago
      process: true,
      // uid del vendendor
      uid,
      // id del la venta - compra
      idThree,
      // uid del comprador
      id,
      // información para el vendedor
      buy,
      // información para el comprador
      sale,
    };
    dispatch(validPago(data));
    // pago verificado
    Toast("Pago ha sido verificado", "success", 5000);
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
            {info?.imp && (
              <AspectRatio
                border={bordes}
                ratio={1}
                w={"full"}
                h={300}
                position={"relative"}
              >
                <Image
                  src={info?.imp}
                  alt="Recibo pago"
                  layout="fill"
                  objectFit="contain"
                />
              </AspectRatio>
            )}
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Pago a nombre: </Text>
            <Text>{info?.nap}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Referencia: </Text>
            <Text>{info?.ref}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Fecha: </Text>
            <Text>{info?.fer}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Correo: </Text>
            <Text>{info?.cor}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Total reflejado: </Text>
            <Text>${to}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Comision: </Text>
            <Text>${incre}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Pago al vendedor: </Text>
            <Text>${to - incre}</Text>
          </HStack>

          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Información adicional: </Text>
            <Text>{info?.inf}</Text>
          </HStack>
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
      <Stack w={full}>
        <VStack w={full} spacing={0}>
          <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
            Información del pago para Vendedor
          </Heading>
          <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Pagar a: </Text>
              <Text>{na}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Telefono: </Text>
              <Text>{te}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Correo: </Text>
              <Text>{co}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Información adicional: </Text>
              <Text>{dt}</Text>
            </HStack>
          </Stack>
        </VStack>
        <VStack w={full} spacing={0}>
          <Heading w={full} my={5} size={"sm"} border={bordes} p={2}>
            Información del cliente
          </Heading>
          <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Nombre: </Text>
              <Text>{naC}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Telefono: </Text>
              <Text>{teC}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Correo: </Text>
              <Text>{coC}</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Text fontWeight={"black"}>Información adicional: </Text>
              <Text>{dtC}</Text>
            </HStack>
          </Stack>
        </VStack>
      </Stack>
    </>
  );
};

export default SaleModal;
