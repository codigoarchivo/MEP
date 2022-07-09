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
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";

import { validPago } from "../../actions/checkout";

import Toast from "../../helpers/Toast";

import GridValueClose from "../../utils/GridValueClose";

import Salemodal from "./Salemodal";

import { CloseIcon } from "@chakra-ui/icons";

const SaleVerify = ({
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
  const { full, content7 } = Breakpoints();

  const handleUser = (uid) => {
    push({
      pathname: "/info/[uid]",
      query: {
        uid,
      },
    });
  };

  // handleLiberate
  const handleLiberate = (e) => {
    e.preventDefault();

    if ([idThree, sal, buy].includes("")) {
      return Toast(
        locale === "en" ? en.historySale.sI : es.historySale.sI,
        "error",
        5000
      );
    }
    const err = locale === "en" ? en.error : es.error;

    dispatch(validPago(referencia, idThree, sal, err));

    Toast(
      locale === "en" ? en.historySale.sH : es.historySale.sH,
      "success",
      5000
    );

    back();
  };

  const closeVerify = () => {
    back();
  };

  return (
    <>
      <HStack
        spacing={{ base: 0, sm: 5 }}
        w={full}
        border={bordes}
        px={{ base: 1, sm: 5 }}
        py={{ base: 3, sm: 5 }}
        justifyContent={{ base: "space-between", sm: "flex-end" }}
        mb={5}
      >
        <Salemodal
          imgs={referencia?.imp}
          receipt={locale === "en" ? en.receipt : es.receipt}
          close={locale === "en" ? en.close : es.close}
          picture={locale === "en" ? en.picture : es.picture}
        />{" "}
        <Button
          fontSize={"xx-small"}
          size={"sm"}
          variant={"primary"}
          textTransform={"capitalize"}
          onClick={() => handleUser(buy)}
        >
          {locale === "en" ? en.buyer : es.buyer}
        </Button>
        <CloseIcon onClick={() => closeVerify()} cursor="pointer" />
      </HStack>
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
          <Stack w={full} spacing={5}>
            {[
              {
                nombre: locale === "en" ? en.name : es.name,
                Valor: product?.na,
              },
              {
                nombre: locale === "en" ? en.quantity : es.quantity,
                Valor: "N°" + product?.cn,
              },
              {
                nombre: locale === "en" ? en.price : es.price,
                Valor: "$" + product?.in,
              },
              {
                nombre: locale === "en" ? en.tax : es.tax,
                Valor: "$" + product?.pj,
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
                <Text overflowX={"hidden"}>{Valor}</Text>
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
          <Stack w={full} spacing={5}>
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
                w={full}
                key={key}
                justifyContent={"space-between"}
                borderBottom={bordes}
              >
                <Text fontWeight={"black"}>{nombre}: </Text>
                <Text overflowX={"hidden"}>{Valor}</Text>
              </HStack>
            ))}
          </Stack>{" "}
          <chakra.form onSubmit={handleLiberate} w={full}>
            <GridValueClose
              set={locale === "en" ? en.historySale.sG : es.historySale.sG}
            />
          </chakra.form>
        </VStack>
      </Stack>
    </>
  );
};

SaleVerify.propTypes = {
  bordes: PropTypes.string,
  idThree: PropTypes.string,
  product: PropTypes.object,
  sale: PropTypes.object,
  referencia: PropTypes.object,
  buy: PropTypes.string,
  sal: PropTypes.string,
};

export default SaleVerify;
