import React from "react";

import PropTypes from "prop-types";

import {
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Button,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";


import { Breakpoints } from "../../helpers/Breakpoints";

import { Salemodal } from "./Salemodal";

import { CloseIcon } from "@chakra-ui/icons";

export const SaleVerify = ({
  bordes,
  // product
  product = {},
  // información del pago del producto
  referencia = {},
  // uid del comprador
  buy = "",
  push,
  locale,
  back,
  es,
  en,
}) => {
  // Breakpoints
  const { full, content7 } = Breakpoints();

  const handleUser = (uid) => {
    push({
      pathname: "/info/[uid]",
      query: {
        uid,
      },
    });
  };

  const closeVerify = () => {
    back();
  };

  const poin = useBreakpointValue({ base: "0", md: "15px" });
  const poinB = useBreakpointValue({ base: "15px", md: "0" });

  return (
    <>
      <Stack
        flexDirection={{ base: "column-reverse", md: "row" }}
        justifyContent={{ base: "space-between", sm: "flex-end" }}
        w={full}
        spacing={0}
        border={bordes}
        px={{ base: 1, sm: 5 }}
        py={{ base: 3, sm: 5 }}
        mb={5}
      >
        <Salemodal
          imgs={referencia?.imp}
          receipt={locale === "en" ? en.receipt : es.receipt}
          close={locale === "en" ? en.close : es.close}
          picture={locale === "en" ? en.picture : es.picture}
        />{" "}
        <Button
          w={{ base: "full", md: "min-content" }}
          style={{ marginLeft: poin, marginBottom: poinB }}
          fontSize={"small"}
          size={"sm"}
          variant={"primary"}
          textTransform={"capitalize"}
          onClick={() => handleUser(buy)}
        >
          {locale === "en" ? en.buyer : es.buyer}
        </Button>
        <Box
          textAlign={"right"}
          w={{ base: "full", md: "min-content" }}
          style={{ marginLeft: poin, marginBottom: poinB }}
        >
          <CloseIcon onClick={() => closeVerify()} cursor="pointer" />
        </Box>
      </Stack>
      <Stack flexDirection={content7} w={full} spacing={0} mb={20}>
        <VStack
          backgroundColor={"#fff"}
          shadow={"lg"}
          w={full}
          mr={{ base: 0, lg: 5 }}
          mb={{ base: 5, lg: 0 }}
          spacing={5}
          p={{ base: 3, sm: 5 }}
          border={bordes}
        >
          <Heading textTransform={"uppercase"} w={full} mb={5} size={"sm"}>
            {locale === "en" ? en.historySale.sE : es.historySale.sE}
          </Heading>
          <Stack w={full} spacing={5} overflow={"auto"}>
            {[
              {
                nombre: locale === "en" ? en.name : es.name,
                Valor: locale === "en" ? product.na.en : product.na.es,
              },
              {
                nombre: locale === "en" ? en.quantity : es.quantity,
                Valor: "N°" + product?.cn,
              },
              {
                nombre: locale === "en" ? en.price : es.price,
                Valor: "$" + product?.pj,
              },
              {
                nombre: locale === "en" ? en.tax : es.tax,
                Valor: "$" + product?.in,
              },
              {
                nombre: locale === "en" ? en.unit : es.unit,
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
          p={{ base: 3, sm: 5 }}
          border={bordes}
          backgroundColor={"#fff"}
        >
          <Heading textTransform={"uppercase"} w={full} mb={5} size={"sm"}>
            {locale === "en" ? en.historySale.sF : es.historySale.sF}
          </Heading>
          <Stack w={full} spacing={5} overflow={"auto"}>
            {[
              {
                nombre: locale === "en" ? en.name : es.name,
                Valor: referencia?.nap,
              },
              {
                nombre: locale === "en" ? en.reference : es.reference,
                Valor: referencia?.ref,
              },
              {
                nombre: locale === "en" ? en.payment : es.payment,
                Valor: referencia?.fer,
              },
              {
                nombre: locale === "en" ? en.mail : es.mail,
                Valor: referencia?.co,
              },
            ].map(({ nombre, Valor }, key) => (
              <HStack
                py={1}
                key={key}
                justifyContent={"space-between"}
                borderBottom={bordes}
              >
                <Text fontWeight={"black"}>{nombre}: </Text>
                <Text>{Valor}</Text>
              </HStack>
            ))}
          </Stack>{" "}
        </VStack>
      </Stack>
    </>
  );
};

SaleVerify.propTypes = {
  bordes: PropTypes.string,
  product: PropTypes.object,
  sale: PropTypes.object,
  referencia: PropTypes.object,
  buy: PropTypes.string,
  push: PropTypes.func,
  locale: PropTypes.string,
  back: PropTypes.func,
  es: PropTypes.object,
  en: PropTypes.object,
};
