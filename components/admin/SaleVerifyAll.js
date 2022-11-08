import React from "react";

import PropTypes from "prop-types";

import {
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  chakra,
  Button,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import { Breakpoints } from "../../helpers/Breakpoints";

import { validPago } from "../../actions/checkout";

import { Toast } from "../../helpers/Toast";

import { GridValueClose } from "../../utils/GridValueClose";

import { Salemodal } from "./Salemodal";

import { CloseIcon } from "@chakra-ui/icons";

export const SaleVerifyAll = ({
  bordes,
  // id del referencia product
  idThree = "",
  // product
  product = {},
  // información del pago del producto
  referencia = {},
  // uid del comprador
  buy = "",
  // uid del vendedor
  sal = "",
  push,
  locale,
  back,
  es,
  en,
}) => {
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { full, content7, fondo } = Breakpoints();

  const handleUser = (uid) => {
    push({
      pathname: "/info/[uid]",
      query: {
        uid,
      },
    });
  };

  const dataDispatch = { ...referencia, process: true, cre: Date.now() };
  // handleLiberate
  const handleLiberate = (e) => {
    e.preventDefault();
    if ([idThree, sal, buy].includes("")) {
      return Toast(
        locale === "en-US" ? en.historySale.sI : es.historySale.sI,
        "error",
        5000
      );
    }

    const err = locale === "en-US" ? en.error : es.error;

    dispatch(validPago(referencia, idThree, sal, err, buy, dataDispatch));

    Toast(
      locale === "en-US" ? en.historySale.sH : es.historySale.sH,
      "success",
      5000
    );
  };

  const closeVerify = () => {
    back();
  };

  const poin = useBreakpointValue({ base: "0", md: "15px" });
  const poinB = useBreakpointValue({ base: "15px", md: "0" });

  const dA = process.env.NEXT_PUBLIC_ROL_A;

  return (
    <>
      <Stack
        flexDirection={{ base: "column-reverse", md: "row" }}
        justifyContent={{ base: "space-between", sm: "flex-end" }}
        alignItems={"center"}
        w={full}
        spacing={0}
        border={bordes}
        px={{ base: 1, sm: 5 }}
        py={{ base: 3, sm: 5 }}
        mb={5}
      >
        <Salemodal
          imgs={referencia?.imp}
          receipt={locale === "en-US" ? en.receipt : es.receipt}
          close={locale === "en-US" ? en.close : es.close}
          picture={locale === "en-US" ? en.picture : es.picture}
        />{" "}
        <Button
          display={dA !== sal ? "block" : "none"}
          w={{ base: "full", md: "min-content" }}
          fontSize={"small"}
          size={"sm"}
          variant={"primary"}
          textTransform={"capitalize"}
          onClick={() => handleUser(sal)}
          style={{ marginLeft: poin, marginBottom: poinB }}
        >
          {locale === "en-US" ? en.sell : es.sell}
        </Button>
        <Button
          w={{ base: "full", md: "min-content" }}
          fontSize={"small"}
          size={"sm"}
          variant={"primary"}
          textTransform={"capitalize"}
          onClick={() => handleUser(buy)}
          style={{ marginLeft: poin, marginBottom: poinB }}
        >
          {locale === "en-US" ? en.buyer : es.buyer}
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
          backgroundColor={fondo}
          rounded={"lg"}
          boxShadow={"dark-lg"}
          w={full}
          mr={{ base: 0, lg: 5 }}
          mb={{ base: 5, lg: 0 }}
          spacing={5}
          p={{ base: 3, sm: 5 }}
          border={bordes}
        >
          <Heading textTransform={"uppercase"} w={full} mb={5} size={"sm"}>
            {locale === "en-US" ? en.historySale.sE : es.historySale.sE}
          </Heading>
          <Stack w={full} spacing={5} overflow={"auto"}>
            {[
              {
                nombre: locale === "en-US" ? en.name : es.name,
                Valor: locale === "en-US" ? product.na.en : product.na.es,
              },
              {
                nombre: locale === "en-US" ? en.quantity : es.quantity,
                Valor: "N°" + product?.cn,
              },
              {
                nombre: locale === "en-US" ? en.price : es.price,
                Valor: "$" + product?.pj,
              },
              {
                nombre: locale === "en-US" ? en.tax : es.tax,
                Valor: "$" + product?.in,
              },
              {
                nombre: locale === "en-US" ? en.unit : es.unit,
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
          backgroundColor={fondo}
          rounded={"lg"}
          boxShadow={"dark-lg"}
          w={full}
          spacing={5}
          p={{ base: 3, sm: 5 }}
          border={bordes}
        >
          <Heading textTransform={"uppercase"} w={full} mb={5} size={"sm"}>
            {locale === "en-US" ? en.historySale.sF : es.historySale.sF}
          </Heading>
          <Stack w={full} spacing={5} overflow={"auto"}>
            {[
              {
                nombre: locale === "en-US" ? en.name : es.name,
                Valor: referencia?.nap,
              },
              {
                nombre: locale === "en-US" ? en.reference : es.reference,
                Valor: referencia?.ref,
              },
              {
                nombre: locale === "en-US" ? en.payment : es.payment,
                Valor: referencia?.fer,
              },
              {
                nombre: locale === "en-US" ? en.mail : es.mail,
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
          <chakra.form onSubmit={handleLiberate} w={full}>
            <GridValueClose
              set={locale === "en-US" ? en.historySale.sG : es.historySale.sG}
              onClose={closeVerify}
              locale={locale}
              es={es}
              en={en}
            />
          </chakra.form>
        </VStack>
      </Stack>
    </>
  );
};

SaleVerifyAll.propTypes = {
  bordes: PropTypes.string,
  idThree: PropTypes.string,
  product: PropTypes.object,
  sale: PropTypes.object,
  referencia: PropTypes.object,
  buy: PropTypes.string,
  sal: PropTypes.string,
  push: PropTypes.func,
  locale: PropTypes.string,
  back: PropTypes.func,
  es: PropTypes.object,
  en: PropTypes.object,
};
