import React from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import {
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  chakra,
  Box,
  Button,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";

import { validPago } from "../../actions/checkout";

import Toast from "../../helpers/Toast";

import GridValueClose from "../../utils/GridValueClose";

import Salemodal from "./Salemodal";

const SaleModal = ({
  bordes,
  // id del referencia product
  idThree = "",
  // product
  product = {},
  // información del pago del producto
  referencia = {},
  // uid del comprador
  uidBuy = "",
  // uid del vendedor
  uidSale = "",
}) => {
  // dispatch
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { full } = Breakpoints();

  const handleUser = (uid) => {
    router.push({
      pathname: "/info/[uid]",
      query: {
        uid,
      },
    });
  };
console.log(referencia);
  // handleLiberate
  const handleLiberate = (e) => {
    e.preventDefault();

    if ([idThree, uidSale, uidBuy].includes("")) {
      return Toast("Error al liberar el producto", "error", 5000);
    }

    dispatch(validPago(referencia, idThree, uidSale));

    Toast("Pago ha sido verificado", "success", 5000);

    router.back();
  };

  const closeVerify = () => {
    router.back();
  };

  return (
    <>
      <HStack w={full} border={bordes} p={5} justifyContent={"flex-end"} mb={5}>
        <Button
          variant={"primary"}
          textTransform={"capitalize"}
          onClick={() => handleUser(uidSale)}
        >
          Información del vendedor
        </Button>
        <Button
          variant={"primary"}
          textTransform={"capitalize"}
          onClick={() => handleUser(uidBuy)}
        >
          Información del comprador
        </Button>
      </HStack>
      <Stack flexDirection={"row"} w={full} spacing={0} mb={20}>
        <VStack shadow={"lg"} w={full} mr={5} spacing={5} p={5} border={bordes}>
          <Heading
            textTransform={"uppercase"}
            w={full}
            mb={5}
            size={"sm"}
            p={2}
          >
            Información del producto o servicio
          </Heading>
          <Stack w={full} spacing={5} p={5}>
            {[
              {
                nombre: "Nombre",
                Valor: product?.na,
              },
              {
                nombre: "Cantidad",
                Valor: "N°" + product?.cn,
              },
              {
                nombre: "Precio",
                Valor: "$" + product?.in,
              },
              {
                nombre: "Impuesto",
                Valor: "$" + product?.pj,
              },
              {
                nombre: "Precio Unitario",
                Valor: "$" + product?.pr,
              },
              {
                nombre: "Total",
                Valor: "$" + product?.to,
              },
            ].map(({ nombre, Valor }, key) => (
              <HStack
                w={full}
                key={key}
                justifyContent={"space-between"}
                borderBottom={bordes}
              >
                <Text fontWeight={"black"}>{nombre}: </Text>
                <Text>{Valor}</Text>
              </HStack>
            ))}
          </Stack>
        </VStack>
        <VStack
          h={"min-content"}
          shadow={"lg"}
          w={full}
          spacing={5}
          p={5}
          border={bordes}
        >
          <Heading
            textTransform={"uppercase"}
            w={full}
            mb={5}
            size={"sm"}
            p={2}
          >
            Información de la transferencia
          </Heading>
          <Stack w={full} spacing={5} p={5}>
            {[
              {
                nombre: "Nombre",
                Valor: referencia?.nap,
              },
              {
                nombre: "Referencia",
                Valor: referencia?.ref,
              },
              {
                nombre: "Fecha",
                Valor: referencia?.fer,
              },
              {
                nombre: "Correo",
                Valor: referencia?.co,
              },
            ].map(({ nombre, Valor }, key) => (
              <HStack
                w={full}
                key={key}
                justifyContent={"space-between"}
                borderBottom={bordes}
              >
                <Text fontWeight={"black"}>{nombre}: </Text>
                <Text>{Valor}</Text>
              </HStack>
            ))}
          </Stack>{" "}
          <chakra.form onSubmit={handleLiberate} w={full}>
            <Salemodal imgs={referencia?.imp} />{" "}
            <GridValueClose onClose={closeVerify} set={"Liberar Proceso"} />
          </chakra.form>
        </VStack>
      </Stack>
    </>
  );
};

SaleModal.propTypes = {
  bordes: PropTypes.string,
  idThree: PropTypes.string,
  product: PropTypes.object,
  sale: PropTypes.object,
  referencia: PropTypes.object,
  uidBuy: PropTypes.string,
  uidSale: PropTypes.string,
};

export default SaleModal;
