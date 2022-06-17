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
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";

import { checkRevert, validPago } from "../../actions/checkout";

import Toast from "../../helpers/Toast";

import GridValueClose from "../../utils/GridValueClose";

import Salemodal from "./Salemodal";

const SaleModal = ({
  bordes,
  // id del referencia product
  idThree = "",
  // product
  product = {},
  // sale
  sale = null,
  // información del pago del producto
  referencia = {},
  // uid del comprador
  uidBuy = {},
  // uid del vendedor
  idProduct = "",
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

    if ([idThree, idProduct, uidBuy.id].includes("")) {
      return Toast("Error al liberar el producto", "error", 5000);
    }


    const dataL = {
      na: "Edgar Marcano",
      co: "+1 973 510 8452",
      te: "ehms1975@gmail.com",
      dt: "381053465609",
    };

    const data = {
      // información para el comprador
      sale: sale === null ? dataL : sale,
      // información del pago del producto
      product,
    };
    // console.log(data, idThree, idProduct, uidBuy.id);
    dispatch(validPago(data, idThree, idProduct, uidBuy.id));
  
    Toast("Pago ha sido verificado", "success", 5000);

    router.back();
  };

  const closeVerify = () => {
    router.back();
    dispatch(checkRevert());
  };

  return (
    <>
      <Stack flexDirection={"row"} w={full} spacing={0} mb={5}>
        <VStack shadow={"lg"} w={full} spacing={5} border={bordes} p={5} mr={5}>
          <Heading
            textTransform={"uppercase"}
            w={full}
            mb={5}
            size={"sm"}
            p={5}
          >
            Información del vendedor
          </Heading>
          {[
            {
              nombre: "Nombre",
              Valor: `${sale === null ? "Edgar Marcano" : sale?.na}`,
            },
            {
              nombre: "Telefono",
              Valor: `${sale === null ? "+1 973 510 8452" : sale?.te}`,
            },
            {
              nombre: "Correo",
              Valor: `${sale === null ? "ehms1975@gmail.com" : sale?.co}`,
            },
            {
              nombre: "Información Adicional",
              Valor: `${sale === null ? "381053465609" : sale?.dt}`,
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
        </VStack>
        <VStack shadow={"lg"} w={full} spacing={5} p={5} border={bordes}>
          <Heading
            textTransform={"uppercase"}
            w={full}
            mb={5}
            size={"sm"}
            p={2}
          >
            Información del cliente
          </Heading>
          <Stack w={full} spacing={5} p={5}>
            {[
              {
                nombre: "Nombre",
                Valor: uidBuy?.na,
              },
              {
                nombre: "Telefono",
                Valor: uidBuy?.te,
              },
              {
                nombre: "Correo",
                Valor: uidBuy?.co,
              },
              {
                nombre: "Información Adicional",
                Valor: uidBuy?.dt,
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
      </Stack>

      <Stack flexDirection={"row"} w={full} spacing={0} mb={20}>
        <VStack
          h={"min-content"}
          shadow={"lg"}
          w={full}
          mr={5}
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
                nombre: "Impuesto",
                Valor: "$" + product?.in,
              },
              {
                nombre: "Precio",
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
  uidBuy: PropTypes.object,
  idProduct: PropTypes.string,
}

export default SaleModal;
