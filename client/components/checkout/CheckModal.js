import React, { useEffect, useRef } from "react";

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
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";

import { WhatsAppIcon } from "../../helpers/IconNew";

import ModeColor from "../../helpers/ModeColor";

import useFormEasy from "../../hooks/useFormEasy";

const initialStates = {
  nap: "",
  rec: "",
  imp: "",
  fer: "",
  cor: "",
  inf: "",
  tip: "",
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
  product,
  buy,
  sale,
}) => {
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
  const { na: naV, te, co, dt, id } = sale;
  // product
  const { cn, pr, uid, id: idP, na: naP } = product;

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
  const { nap, rec, imp, fer, cor, tip, inf } = values;

  console.log(values);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nap === "" ||
      rec === "" ||
      imp === "" ||
      fer === "" ||
      cor === "" ||
      inf === "" ||
      tip === ""
    ) {
      return Toast(
        "Si vas a comprar tiene llenar todos los campos",
        "error",
        5000
      );
    }

    // dispatch(userAdicional({ na, te, co, dt, id, rol }));
    onClose();
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
          <ModalHeader>Comprador: {naC}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack
              flexDirection={content5}
              spacing={0}
              w={full}
              justifyContent={"space-around"}
            >
              <Stack spacing={0} w={"40%"} mr={5}>
                <VStack
                  alignContent={"center"}
                  h={"full"}
                  border={bordes}
                  spacing={0}
                >
                  <Heading
                    pt={5}
                    size={"xs"}
                    textTransform={"uppercase"}
                    fontWeight={"normal"}
                  >
                    informacion pago para el vendedor
                  </Heading>
                  <chakra.form onSubmit={handleSubmit} w={"full"} p={3}>
                    <Grid
                      templateColumns={repeat1}
                      alignItems={"center"}
                      columnGap={points3}
                    >
                      <GridItem colSpan={2}>
                        <FormLabel htmlFor="nap">Nombre Realizo pago</FormLabel>
                        <Input
                          name="nap"
                          id="nap"
                          onChange={handleInputChange}
                          value={nap}
                          type={"text"}
                          placeholder="Nombre"
                        />
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormLabel htmlFor="cor">Correo</FormLabel>
                        <Input
                          name="cor"
                          id="cor"
                          onChange={handleInputChange}
                          value={cor}
                          type={"text"}
                          placeholder="Correo"
                        />
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormLabel htmlFor="imp">Imagen</FormLabel>
                        <InputGroup>
                          <Button
                            w={"full"}
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
                      </GridItem>
                      <GridItem colSpan={2}>
                        <FormLabel htmlFor="tip">Tipo pago</FormLabel>
                        <RadioGroup
                          name="tip"
                          id="tip"
                          onChange={handleInputChange3}
                          value={tip}
                          defaultValue={`Pago $${
                            comision.current + resumen.current
                          } en la
                                Tienda`.toString()}
                        >
                          <Stack spacing={5} direction="column">
                            <Radio
                              colorScheme="brand"
                              value={`Pago $${
                                comision.current + resumen.current
                              } en la Tienda`.toString()}
                            >
                              Pago ${comision.current + resumen.current} en la
                              Tienda
                            </Radio>
                            <Radio
                              colorScheme="brand"
                              value={`Comisión $${comision.current.toString()} en la tienda`}
                            >
                              Comisión ${comision.current} en la tienda
                            </Radio>
                            <Radio
                              colorScheme="brand"
                              value={`Pago al vendedor $${resumen.current.toString()}`}
                            >
                              Pago al vendedor ${resumen.current}
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormLabel htmlFor="inf">
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

                      <GridItem colSpan={2}>
                        <HStack
                          w={"full"}
                          justifyContent="flex-end"
                          spacing={10}
                        >
                          <Button variant={"secondary"} onClick={onClose}>
                            Close
                          </Button>
                          <Button variant={"primary"} type="submit" ml={3}>
                            Guardar
                          </Button>
                        </HStack>
                      </GridItem>
                    </Grid>
                  </chakra.form>
                </VStack>

                <Box>
                  <Heading size={"sm"} border={bordes} p={2}>
                    Información de Pago
                  </Heading>
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
                </Box>
              </Stack>
              <Stack
                justifyContent={"space-around"}
                flexDirection={content5}
                w={"60%"}
                spacing={0}
              >
                <Stack spacing={3} mr={0}>
                  <Heading size={"sm"} border={bordes} p={2}>
                    Información de la tienda
                  </Heading>
                  <HStack w={full}>
                    <Heading size={"sm"}>Telefono:</Heading>
                    <Text>+1 973 510 8452</Text>
                  </HStack>
                  <Stack w={full} spacing={5}>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="brand.700" />
                        Transferencia por Zelle
                      </ListItem>
                    </List>
                    <HStack>
                      <Heading size={"sm"}>Nombre:</Heading>
                      <Text>Edgar Marcano</Text>
                    </HStack>
                    <HStack>
                      <Heading size={"sm"}>Correo:</Heading>
                      <Text>ehms1975@gmail.com</Text>
                    </HStack>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="brand.700" />
                        Desde la aplicación móvil
                      </ListItem>
                    </List>
                    <HStack>
                      <Heading size={"sm"}>Información:</Heading>
                      <Link
                        href="https://www.bankofamerica.com/online-banking/mobile-and-online-banking-features/money-transfer/es/#:~:text=Seleccione%20Transferir%20%7C%20Enviar%20y%20despu%C3%A9s,transferencia%20y%20luego%20toque%20Continuar."
                        isExternal
                      >
                        Ir a<ExternalLinkIcon mx="2px" />
                      </Link>
                    </HStack>
                    <HStack>
                      <Heading size={"sm"}>Nombre:</Heading>
                      <Text>Edgar Marcano</Text>
                    </HStack>
                    <HStack>
                      <Heading size={"sm"}>N° Cuenta:</Heading>
                      <Text>381053465609</Text>
                    </HStack>
                  </Stack>
                  <HStack w={full}>
                    <Heading size={"sm"}>WhatsApp:</Heading>
                    <Link
                      href="https://wa.me/19735108452?text=Hola%20Edgar%20Marcano%20voy%20a%20"
                      isExternal
                    >
                      Ir a<WhatsAppIcon mx="2px" />
                    </Link>
                  </HStack>
                </Stack>
                <Stack spacing={3} mb={2}>
                  <Heading size={"sm"} border={bordes} p={2}>
                    Información del vendedor
                  </Heading>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"black"}>Nombre: </Text>
                    <Text>{naV}</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
                    <Text fontWeight={"black"}>Telefono: </Text>
                    <Text>{te}</Text>
                  </HStack>
                  <HStack justifyContent={"space-between"}>
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
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckModal;
