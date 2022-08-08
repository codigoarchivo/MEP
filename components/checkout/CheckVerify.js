import React, { useState } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";

import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import {
  Button,
  Heading,
  HStack,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
  chakra,
  FormLabel,
  GridItem,
  Grid,
  Box,
  CloseButton,
  useBreakpointValue,
  Tooltip,
  Flex,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";

import { ModeColor } from "../../helpers/ModeColor";

import { useFormAll } from "../../hooks/useFormAll";

import { validShop } from "../../actions/checkout";

import { Toast } from "../../helpers/Toast";

import { FileAll } from "../../utils/FileAll";
import { GridItemForm } from "../../utils/GridItemForm";
import { GridItemFormTextarea } from "../../utils/GridItemFormTextarea";

import { dbUser } from "../../data/dbProducts";

const initialStates = {
  nap: "",
  co: "",
  imp: "",
  fer: "",
  dt: "",
  ref: "",
};

export const CheckVerify = ({
  // BORDES
  bordes = "",
  // id del buy del la compra del producto
  idThree = "",
  // product
  product = {},
  locale,
  back,
  push,
  en,
  es,
}) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useState
  const [urlImage, setUrlImage] = useState("");
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { repeat1, points3, full, content7 } = Breakpoints();
  // mode Color
  const { modelC } = ModeColor();

  // useForm
  const { values, reset, handleInputChange } = useFormAll(initialStates);

  // agrega imagen
  values.imp = urlImage ? urlImage : values.imp;
  // values
  const { nap, co, imp, fer, dt, ref } = values;

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const d = await dbUser(a.uid);

    if (d.size === 0) {
      return Toast(locale === "en" ? en.verify.vA : es.verify.vA, "info", 5000);
    } else {
      const err = locale === "en" ? en.error : es.error;

      if ([nap, co, imp, fer, dt, ref].includes("") || !urlImage) {
        return Toast(locale === "en" ? en.fields : es.fields, "error", 5000);
      }

      Toast(locale === "en" ? en.verify.vI : es.verify.vI, "success", 5000);

      const shop = {
        nap,
        co,
        imp,
        fer,
        dt,
        ref,
        // información del producto
        product,
        // uid del principal
        own: process.env.NEXT_PUBLIC_ROL_A,
        // uid del comprador que se encuentra logeado
        buy: a.uid,
        // tiempo del recibo de la compra
        cre: Date.now(),
      };

      dispatch(validShop(shop, idThree, err));
      reset();
      values.imp = "";
    }
  };

  const closeVerify = () => {
    back();
  };

  const handleClient = () => {
    push({
      pathname: "/info/[uid]",
      query: { uid: a.uid },
    });
  };

  const point = useBreakpointValue({ base: 2, lg: 1 });
  return (
    <>
      <Text py={5} overflowX={"hidden"}>
        <Button onClick={handleClient} variant={"primary"} size={"sm"}>
          {locale === "en" ? en.verify.vA : es.verify.vA}
        </Button>{" "}
        - {locale === "en" ? en.verify.vB : es.verify.vB}
      </Text>
      <Stack flexDirection={content7} w={full} spacing={0} color={modelC}>
        <VStack
          shadow={"lg"}
          w={full}
          mr={{ base: 0, lg: 5 }}
          mb={{ base: 5, lg: 0 }}
          spacing={5}
          p={{ base: 3, sm: 5 }}
          border={bordes}
        >
          <Heading textTransform={"uppercase"} w={full} mb={5} size={"sm"}>
            {locale === "en" ? en.verify.vC : es.verify.vC}
          </Heading>
          <Stack w={full} spacing={5}>
            {[
              {
                nombre: locale === "en" ? en.name : es.name,
                Valor: locale === "en" ? product?.na?.en : product?.na?.es,
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
        >
          <Heading textTransform={"uppercase"} w={full} mb={5} size={"sm"}>
            {locale === "en" ? en.verify.vH : es.verify.vH}
          </Heading>
          <Stack w={full} spacing={5}>
            <List spacing={3}>
              <ListItem color={modelC}>
                <ListIcon as={CheckCircleIcon} />
                {locale === "en" ? en.verify.vE : es.verify.vE}
              </ListItem>
            </List>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Heading size={"sm"}>
                {locale === "en" ? en.Information : es.Information}:
              </Heading>
              <Link
                href="https://www.bankofamerica.com/online-banking/mobile-and-online-banking-features/money-transfer/es/#:~:text=Seleccione%20Transferir%20%7C%20Enviar%20y%20despu%C3%A9s,transferencia%20y%20luego%20toque%20Continuar."
                isExternal
              >
                <ExternalLinkIcon color={modelC} mx="2px" />
              </Link>
            </HStack>
            {[
              {
                nombre: locale === "en" ? en.name : es.name,
                Valor: "Edgar Marcano",
              },
              {
                nombre: locale === "en" ? en.mail : es.mail,
                Valor: "ehms1975@gmail.com",
              },
              {
                nombre: locale === "en" ? en.phone : es.phone,
                Valor: "+1 973 510 8452",
              },
              {
                nombre: locale === "en" ? en.accountNo : es.accountNo,
                Valor: "381053465609",
              },
            ].map(({ nombre, Valor }, key) => (
              <HStack
                py={1}
                key={key}
                justifyContent={"space-between"}
                borderBottom={bordes}
              >
                <Heading size={"sm"}>{nombre}:</Heading>
                <Text overflowX={"hidden"}>{Valor}</Text>
              </HStack>
            ))}
          </Stack>
        </VStack>
      </Stack>

      <chakra.form
        onSubmit={handleSubmit}
        w={full}
        p={{ base: 3, lg: 10 }}
        border={bordes}
        shadow={"lg"}
      >
        <Grid
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
          w={full}
        >
          <GridItem mb={3} colSpan={2}>
            <HStack w={full} justifyContent={"space-between"}>
              <Heading textTransform={"uppercase"} w={full} mb={5} size={"sm"}>
                {locale === "en" ? en.verify.vF : es.verify.vF}
              </Heading>
              <CloseButton color={modelC} onClick={closeVerify} />
            </HStack>
          </GridItem>

          {[
            {
              nombre: locale === "en" ? en.person : es.person,
              Valor: nap,
              na: "nap",
              place: locale === "en" ? en.name : es.name,
              type: "text",
            },
            {
              nombre: locale === "en" ? en.reference : es.reference,
              Valor: ref,
              na: "ref",
              place: `N° ${locale === "en" ? en.reference : es.reference}`,
              type: "text",
            },
            {
              nombre: locale === "en" ? en.mail : es.mail,
              Valor: co,
              na: "co",
              place: locale === "en" ? en.mail : es.mail,
              type: "email",
            },
            {
              nombre: locale === "en" ? en.payment : es.payment,
              Valor: fer,
              na: "fer",
              type: "datetime-local",
            },
          ].map(({ nombre, Valor, na, place, type }, key) => (
            <GridItemForm
              key={key}
              mb={3}
              points={point}
              na={na}
              name={nombre}
              val={Valor}
              handle={handleInputChange}
              type={type}
              place={place}
            />
          ))}
          <GridItemFormTextarea
            points={2}
            name={locale === "en" ? en.additional : es.additional}
            na={"dt"}
            val={dt}
            place={locale === "en" ? en.additional : es.additional}
            handle={handleInputChange}
            mb={10}
          />
          <GridItem colSpan={1}>
            <FormLabel
              htmlFor="imp"
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color={modelC}
            >
              {locale === "en" ? en.receipt : es.receipt}
            </FormLabel>
            <HStack
              justifyContent={"space-between"}
              w={"full"}
              spacing={{ base: 5, md: 20 }}
            >
              {/* save file */}
              <Box w={"full"} shadow={"lg"} border={bordes} rounded={"sm"}>
                <FileAll
                  setUrlImage={setUrlImage}
                  fileName={"fotosRecibo"}
                  save={locale === "en" ? en.goup : es.goup}
                  image={locale === "en" ? en.image : es.image}
                />
              </Box>

              <Box w="full" h={"full"} position={"relative"}>
                <Image
                  src={
                    urlImage ||
                    `https://via.placeholder.com/100.png?text=${
                      locale === "en" ? en.picture : es.picture
                    }`
                  }
                  alt="Recibo pago"
                  width={100}
                  height={100}
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
            </HStack>
          </GridItem>

          <GridItem colSpan={2} mt={5}>
            <HStack w={"full"} justifyContent="flex-end" spacing={10}>
              <Button variant={"tertiary"} onClick={closeVerify}>
                {locale === "en" ? en.close : es.close}
              </Button>
              <Flex>
                <Tooltip
                  hasArrow
                  label={locale === "en" ? en.seller : es.seller}
                  w={"min-content"}
                >
                  <Button
                    variant={"primary"}
                    type="submit"
                    ml={3}
                    shadow={"lg"}
                  >
                    {locale === "en" ? en.send : es.send}
                  </Button>
                </Tooltip>
              </Flex>
            </HStack>
          </GridItem>
        </Grid>
      </chakra.form>
    </>
  );
};

CheckVerify.propTypes = {
  product: PropTypes.object,
  idThree: PropTypes.string,
  bordes: PropTypes.string,
  locale: PropTypes.string,
  back: PropTypes.func,
  push: PropTypes.func,
  en: PropTypes.object,
  es: PropTypes.object,
};
