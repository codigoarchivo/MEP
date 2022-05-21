import React, { useEffect, useRef } from "react";

import Image from "next/image";

import {
  CheckCircleIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  chakra,
  FormLabel,
  Input,
  Textarea,
  GridItem,
  Grid,
  InputGroup,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";

import { addDays } from "date-fns";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";

import { WhatsAppIcon } from "../../helpers/IconNew";

import ModeColor from "../../helpers/ModeColor";

import useFormEasy from "../../hooks/useFormEasy";

import { validSales, validShop } from "../../actions/checkout";

import Toast from "../../helpers/Toast";

const initialStates = {
  nap: "",
  imp: "",
  fer: "",
  cor: "",
  inf: "",
  tip: "",
  ref: "",
};

const CheckModal = ({
  isOpen,
  onOpen,
  onClose,
  initialRef,
  backgroundColor,
  leftIcon,
  variant,
  size,
  border,
  w,
  disabled,
  nameButton,
  bordes,
  // id del buy product
  idThree,
  // product
  product,
  // buy
  buy,
  // sale
  sale,
}) => {
  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);
  // useRef
  const cat = useRef(0);
  // useRef
  const resumen = useRef(0);
  // useRef
  const comision = useRef(0);
  // file
  const file = useRef();
  // router
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { repeat1, points3, content5, full } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();

  // buy
  const { na: naC } = buy;
  // sale
  const { na: naV, te, co, dt } = sale;
  // product
  const { cn, pr, uid: uidSale, na: naP } = product;

  useEffect(() => {
    // cantidad de productos
    cat.current += Number(cn);
    // total de productos a comprar
    resumen.current = Number(cn) * Number(pr);
    // comision 20% al comprador
    comision.current = resumen.current * 0.2;
  }, []);

  // useForm
  const {
    values,
    urlImage,
    progress,
    reset,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
  } = useFormEasy(initialStates);
  // agrega imagen
  values.imp = urlImage ? urlImage : values.imp;
  // values
  const { nap, imp, fer, cor, tip, inf, ref, condicion = "1" } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nap === "" ||
      imp === "" ||
      fer === "" ||
      cor === "" ||
      inf === "" ||
      ref === "" ||
      tip === ""
    ) {
      return Toast("Todos los campos son obligatorios", "error", 5000);
    }

    const shop = {
      nap,
      imp,
      fer,
      cor,
      tip,
      inf,
      ref,
      // uid del comprador que se encuentra logeado
      uidBuy: a.uid.toString(),
      // uid del vendedor que esta guardado producto
      uidSale,
      // idThree es id del la compra del producto
      idThree,
    };

    const info = {
      nap,
      imp,
      fer,
      cor,
      tip,
      inf,
      ref,
      // uid del comprador que se encuentra logeado
      uidBuy: a?.uid.toString(),
      // uid del vendedor que esta guardado producto
      uidSale,
      // idThree es id del la compra del producto
      idThree,
      // limite de tiempo para pagar a la tienda 
      lim: addDays(Date.now(), 2),
    };

    switch (condicion) {
      case "1":
        dispatch(validShop(shop));
        break;
      case "2":
        dispatch(validShop(shop));
        break;
      case "3":
        dispatch(validSales(info));
        break;
    }

    onClose();
    reset();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor={backgroundColor}
        leftIcon={leftIcon}
        variant={variant}
        size={size}
        border={border}
        w={w}
        disabled={disabled}
      >
        {nameButton}
      </Button>
      <Modal
        size={"6xl"}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform={"uppercase"}>
            Comprador: {naC}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack
              flexDirection={content5}
              spacing={0}
              w={full}
              justifyContent={"space-around"}
            >
              <VStack
                mr={5}
                w={full}
                alignContent={"center"}
                h={"full"}
                spacing={0}
              >
                <chakra.form
                  onSubmit={handleSubmit}
                  w={full}
                  p={3}
                  border={bordes}
                >
                  <Grid
                    templateColumns={repeat1}
                    alignItems={"center"}
                    columnGap={points3}
                  >
                    <GridItem mb={3} colSpan={2}>
                      <Heading
                        border={bordes}
                        p={2}
                        size={"xs"}
                        textTransform={"uppercase"}
                        fontWeight={"normal"}
                        mb={5}
                      >
                        informacion pago para el vendedor o tienda
                      </Heading>
                    </GridItem>
                    <GridItem mb={3} colSpan={2}>
                      <FormLabel htmlFor="nap" textTransform={"uppercase"}>
                        Nombre realizo pago
                      </FormLabel>
                      <Input
                        name="nap"
                        id="nap"
                        onChange={handleInputChange}
                        value={nap}
                        type={"text"}
                        placeholder="Nombre"
                      />
                    </GridItem>
                    <GridItem mb={3} colSpan={2}>
                      <FormLabel htmlFor="ref" textTransform={"uppercase"}>
                        Referencia
                      </FormLabel>
                      <Input
                        name="ref"
                        id="ref"
                        onChange={handleInputChange}
                        value={ref}
                        type={"text"}
                        placeholder="N° Referencia"
                      />
                    </GridItem>
                    <GridItem mb={3} colSpan={2}>
                      <FormLabel htmlFor="cor" textTransform={"uppercase"}>
                        Correo
                      </FormLabel>
                      <Input
                        name="cor"
                        id="cor"
                        onChange={handleInputChange}
                        value={cor}
                        type={"text"}
                        placeholder="Correo"
                      />
                    </GridItem>
                    <GridItem mb={3} colSpan={2}>
                      <FormLabel htmlFor="fer" textTransform={"uppercase"}>
                        Fecha de pago
                      </FormLabel>
                      <Input
                        name="fer"
                        id="fer"
                        onChange={handleInputChange}
                        value={fer}
                        type={"date"}
                      />
                    </GridItem>

                    <GridItem mb={3} colSpan={2}>
                      <FormLabel htmlFor="imp" textTransform={"uppercase"}>
                        Imagen del recibo
                      </FormLabel>
                      <HStack>
                        <InputGroup>
                          <Button
                            w={"80%"}
                            rightIcon={<DownloadIcon w={6} h={6} />}
                            variant={"outline"}
                            textTransform={"uppercase"}
                            onClick={() => file.current.click()}
                            size="md"
                            fontWeight={"normal"}
                            _hover={{ border: bg }}
                            p={1}
                          >
                            Subir: {progress}%
                          </Button>
                          <chakra.input
                            onChange={handleInputChange2}
                            name="imp"
                            type={"file"}
                            ref={file}
                            display="none"
                          />
                        </InputGroup>
                        <Flex w={"20%"} justifyContent={"center"}>
                          {imp && (
                            <AspectRatio
                              border={bordes}
                              ratio={1}
                              w={59}
                              h={59}
                              position={"relative"}
                            >
                              <Image
                                src={imp}
                                alt="Recibo pago"
                                layout="fill"
                                objectFit="contain"
                              />
                            </AspectRatio>
                          )}
                        </Flex>
                      </HStack>
                    </GridItem>
                    <GridItem mb={3} colSpan={2}>
                      <FormLabel htmlFor="tip" textTransform={"uppercase"}>
                        Tipo pago
                      </FormLabel>
                      <RadioGroup
                        name="tip"
                        id="tip"
                        onChange={handleInputChange3}
                        value={tip}
                      >
                        <Stack
                          spacing={3}
                          direction="column"
                          border={bordes}
                          p={2}
                        >
                          <Radio
                            name="tienda"
                            colorScheme="brand"
                            value={`1 Pago $${
                              comision.current + resumen.current
                            } en la Tienda`.toString()}
                          >
                            Pago ${comision.current + resumen.current} en la
                            Tienda
                          </Radio>
                          <Radio
                            name="comision"
                            colorScheme="brand"
                            value={`2 Comisión $${comision.current.toString()} en la tienda`}
                          >
                            Comisión ${comision.current} en la tienda
                          </Radio>
                          <Radio
                            name="vendedor"
                            colorScheme="brand"
                            value={`3 Pago al vendedor $${resumen.current.toString()}`}
                          >
                            Pago al vendedor ${resumen.current}
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </GridItem>

                    <GridItem mb={5} colSpan={2}>
                      <FormLabel htmlFor="inf" textTransform={"uppercase"}>
                        Informacion Adicional
                      </FormLabel>
                      <Textarea
                        bg={bg}
                        _focus={brand}
                        variant="filled"
                        name="inf"
                        id="inf"
                        value={inf}
                        onChange={handleInputChange}
                        placeholder="Informacion Adicional"
                        size="xs"
                      />
                    </GridItem>

                    <GridItem mb={3} colSpan={2}>
                      <HStack w={"full"} justifyContent="flex-end" spacing={10}>
                        <Button variant={"secondary"} onClick={onClose}>
                          Close
                        </Button>
                        <Button variant={"primary"} type="submit" ml={3}>
                          Envio del recibo
                        </Button>
                      </HStack>
                    </GridItem>
                  </Grid>
                </chakra.form>
              </VStack>

              <VStack w={full} spacing={0}>
                <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
                  Información de Pago
                </Heading>
                <Stack w={full} mt={5} spacing={2} border={bordes} p={5}>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Nombre: </Text>
                    <Text>{naP}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Precio: </Text>
                    <Text>${pr}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Cantidad: </Text>
                    <Text>{cat.current}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>comision 20%: </Text>
                    <Text>${comision.current}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    borderBottom={bordes}
                  >
                    <Text fontWeight={"black"}>Solo pagar vendedor: </Text>
                    <Text>${resumen.current}</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"black"}>Total: </Text>
                    <Text>${comision.current + resumen.current}</Text>
                  </HStack>
                </Stack>

                <Stack w={full} spacing={3}>
                  <Heading mt={5} size={"sm"} border={bordes} p={2}>
                    Información de la tienda
                  </Heading>
                  <HStack w={full} justifyContent={"space-between"}>
                    <Heading size={"sm"}>Telefono:</Heading>
                    <Text>
                      +1 973 510 8452{" "}
                      <Link
                        href="https://wa.me/19735108452?text=Hola%20Edgar%20Marcano%20voy%20a%20"
                        isExternal
                      >
                        Ir a<WhatsAppIcon mx="2px" />
                      </Link>
                    </Text>
                  </HStack>
                  <Stack w={full} spacing={2} border={bordes} p={5}>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="brand.700" />
                        Transferencia por Zelle
                      </ListItem>
                    </List>
                    <HStack
                      justifyContent={"space-between"}
                      borderBottom={bordes}
                    >
                      <Heading size={"sm"}>Nombre:</Heading>
                      <Text>Edgar Marcano</Text>
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      borderBottom={bordes}
                    >
                      <Heading size={"sm"}>Correo:</Heading>
                      <Text>ehms1975@gmail.com</Text>
                    </HStack>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="brand.700" />
                        Desde la aplicación móvil
                      </ListItem>
                    </List>
                    <HStack
                      justifyContent={"space-between"}
                      borderBottom={bordes}
                    >
                      <Heading size={"sm"}>Información:</Heading>
                      <Link
                        href="https://www.bankofamerica.com/online-banking/mobile-and-online-banking-features/money-transfer/es/#:~:text=Seleccione%20Transferir%20%7C%20Enviar%20y%20despu%C3%A9s,transferencia%20y%20luego%20toque%20Continuar."
                        isExternal
                      >
                        Ir a<ExternalLinkIcon mx="2px" />
                      </Link>
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      borderBottom={bordes}
                    >
                      <Heading size={"sm"}>Nombre:</Heading>
                      <Text>Edgar Marcano</Text>
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      borderBottom={bordes}
                    >
                      <Heading size={"sm"}>N° Cuenta:</Heading>
                      <Text>381053465609</Text>
                    </HStack>
                  </Stack>
                </Stack>
                <Stack w={full} spacing={3} mb={2}>
                  <Heading mt={5} size={"sm"} border={bordes} p={2}>
                    Información del vendedor
                  </Heading>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"black"}>Telefono: </Text>
                    <Text>{te}</Text>
                  </HStack>
                  <Stack w={full} spacing={2} border={bordes} p={5}>
                    <HStack
                      justifyContent={"space-between"}
                      borderBottom={bordes}
                    >
                      <Text fontWeight={"black"}>Nombre: </Text>
                      <Text>{naV}</Text>
                    </HStack>

                    <HStack
                      justifyContent={"space-between"}
                      borderBottom={bordes}
                    >
                      <Text fontWeight={"black"}>Correo: </Text>
                      <Text>{co}</Text>
                    </HStack>
                    <VStack>
                      <Text w={full} fontWeight={"black"}>
                        Información Adicional:{" "}
                      </Text>
                      <Text w={full}>{dt}</Text>
                    </VStack>
                  </Stack>
                </Stack>
              </VStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckModal;
