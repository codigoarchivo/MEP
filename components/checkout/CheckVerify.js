import React, { useState } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

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
  Divider,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import ModeColor from "../../helpers/ModeColor";

import useFormAll from "../../hooks/useFormAll";

import { validShop } from "../../actions/checkout";

import Toast from "../../helpers/Toast";

import FileAll from "../../utils/FileAll";
import GridItemForm from "../../utils/GridItemForm";
import GridItemFormTextarea from "../../utils/GridItemFormTextarea";
import GridValueClose from "../../utils/GridValueClose";

const initialStates = {
  nap: "",
  co: "",
  imp: "",
  fer: "",
  dt: "",
  ref: "",
};

const CheckVerify = ({
  // uid del comprador que se encuentra logeado
  uid = "",
  // BORDES
  bordes = "",
  // id del buy del la compra del producto
  idThree = "",
  // product
  product = {},
}) => {
  const [urlImage, setUrlImage] = useState("");
  // router
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { repeat1, points3, full } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();

  // useForm
  const { values, reset, handleInputChange } = useFormAll(initialStates);

  // agrega imagen
  values.imp = urlImage ? urlImage : values.imp;
  // values
  const { nap, co, imp, fer, dt, ref } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nap, co, imp, fer, dt, ref].includes("") || !urlImage) {
      return Toast("Todos los campos son obligatorios", "error", 5000);
    }

    const shop = {
      nap,
      co,
      imp,
      fer,
      dt,
      ref,
      // información del producto
      product,
      // uid del comprador que se encuentra logeado
      uidBuy: uid,
      // idThree es id del la compra del producto
      idThree,
    };

    dispatch(validShop(shop));

    Toast("Enviada Verificación espere a que recibe", "success", 5000);

    reset();

    router.push({
      pathname: "/checkout/[uid]",
      query: {
        uid,
      },
    });
  };

  const closeVerify = () => {
    router.push({
      pathname: "/checkout/[uid]",
      query: {
        uid,
      },
    });
  };

  const handleClient = () => {
    router.push({
      pathname: "/info/[uid]",
      query: { uid },
    });
  };

  return (
    <>
      <Text py={5}>
        !importante Información para que el vendedor -{" "}
        <Button onClick={handleClient} variant={"primary"}>
          ir
        </Button>{" "}
        - Datos quedara guardado en la base de datos y se utilizara para futuras
        compras.
      </Text>
      <Stack flexDirection={"row"} w={full} spacing={0}>
        <VStack shadow={"lg"} w={full} mr={5} spacing={2} border={bordes} p={5}>
          <Heading
            textTransform={"uppercase"}
            w={full}
            mb={5}
            size={"sm"}
            border={bordes}
            p={2}
          >
            Información de Pago
          </Heading>
          <Stack w={full} spacing={3} border={bordes} p={5}>
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

        <VStack shadow={"lg"} w={full} spacing={2} border={bordes} p={5}>
          <Heading
            textTransform={"uppercase"}
            w={full}
            mb={5}
            size={"sm"}
            border={bordes}
            p={2}
          >
            Información de la tienda
          </Heading>
          <Stack w={full} spacing={2} border={bordes} p={5}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.700" />
                Transferencia por Zelle
              </ListItem>
            </List>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Heading size={"sm"}>Información:</Heading>
              <Link
                href="https://www.bankofamerica.com/online-banking/mobile-and-online-banking-features/money-transfer/es/#:~:text=Seleccione%20Transferir%20%7C%20Enviar%20y%20despu%C3%A9s,transferencia%20y%20luego%20toque%20Continuar."
                isExternal
              >
                Ir a<ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
            {[
              { nombre: "Nombre", Valor: "Edgar Marcano" },
              { nombre: "Correo", Valor: "ehms1975@gmail.com" },
              { nombre: "Telefono", Valor: "+1 973 510 8452" },
              { nombre: "N° Cuenta", Valor: "381053465609" },
            ].map(({ nombre, Valor }, key) => (
              <HStack
                py={1}
                key={key}
                justifyContent={"space-between"}
                borderBottom={bordes}
              >
                <Heading size={"sm"}>{nombre}:</Heading>
                <Text>{Valor}</Text>
              </HStack>
            ))}
          </Stack>
        </VStack>
      </Stack>

      <Divider py={5} />

      <chakra.form
        onSubmit={handleSubmit}
        w={full}
        p={10}
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
            <Heading
              textTransform={"uppercase"}
              w={full}
              mb={5}
              size={"sm"}
              border={bordes}
              p={2}
            >
              <HStack w={full} justifyContent={"space-between"}>
                <Text>informacion pago para la tienda</Text>
                <CloseButton onClick={closeVerify} />
              </HStack>
            </Heading>
          </GridItem>

          {[
            {
              nombre: "Nombre realizo pago",
              Valor: nap,
              na: "nap",
              place: "Nombre",
              type: "text",
            },
            {
              nombre: "Referencia",
              Valor: ref,
              na: "ref",
              place: "N° Referencia",
              type: "text",
            },
            {
              nombre: "Correo",
              Valor: co,
              na: "co",
              place: "Correo",
              type: "email",
            },
            {
              nombre: "Fecha de pago",
              Valor: fer,
              na: "fer",
              type: "date",
            },
          ].map(({ nombre, Valor, na, place, type }, key) => (
            <GridItemForm
              key={key}
              mb={3}
              points={1}
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
            name={"Informacion Adicional"}
            na={"dt"}
            val={dt}
            place={"Informacion Adicional"}
            handle={handleInputChange}
            bg={bg}
            brand={brand}
            mb={10}
          />
          <GridItem mb={3} colSpan={1} p={5}>
            <FormLabel
              htmlFor="imp"
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              Imagen del recibo
            </FormLabel>
            <HStack justifyContent={"space-between"} w={"full"} spacing={20}>
              {/* save file */}
              <Box w={"full"}>
                <FileAll setUrlImage={setUrlImage} fileName={"fotosRecibo"} />
              </Box>

              <Box w="full" h={"full"} position={"relative"}>
                <Image
                  src={
                    urlImage ||
                    "https://via.placeholder.com/100.png?text=Imagen"
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

          <GridValueClose onClose={closeVerify} set={"Envio del recibo"} />
        </Grid>
      </chakra.form>
    </>
  );
};

CheckVerify.propTypes = {
  uid: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  idThree: PropTypes.string.isRequired,
  bordes: PropTypes.string.isRequired,
};

export default CheckVerify;
