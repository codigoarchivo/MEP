import React, { useRef } from "react";

import Proptypes from "prop-types";

import { useRouter } from "next/router";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";
import ModeColor from "../../helpers/ModeColor";
import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import { dataCategory } from "../../data/store";

const initialStates = {
  id: "",
  nombre: "",
  precio: "",
  image: "",
  uid: "",
  descripcion: "",
  category: "",
  cantidad: "",
  detalles: "",
};

export const DashboardDialogModal = ({ modality, setModality, word, data }) => {
  // router
  const router = useRouter();
  // file
  const file = useRef();
  // ref
  const cancelRef = useRef();
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();

  // guardar states
  const dataInitial = { ...initialStates, ...data };

  const { values, handleInputChange, handleInputChange2 } = useForm(
    dataInitial
  );
  // validar
  const {
    mNombre,
    mPrecio,
    mImage,
    mDetalles,
    mDescripcion,
    mCantidad,
    mCategory,
    fiel,
    ErrorRetur,
  } = Validator(values);

  // values
  const {
    nombre,
    precio,
    image,
    descripcion,
    category,
    cantidad,
    detalles,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    return ErrorRetur === null ? console.log(fiel) : console.log("hola");
  };
  // cerrar
  const onClose = () => {
    router.push("/dashboard");
    setModality(false);
  };

  return (
    <>
      <AlertDialog
        isOpen={modality}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <HStack spacing={5}>
                <CloseButton size="md" onClick={onClose} />
                <Heading as="h1" size={"md"} textTransform={"uppercase"}>
                  {word}
                </Heading>
              </HStack>
            </AlertDialogHeader>
            <AlertDialogBody>
              <VStack justifyContent="center" w="full">
                <Grid
                  as={"form"}
                  templateRows={`repeat(5, 1fr)`}
                  templateColumns={repeat1}
                  alignItems={"center"}
                  columnGap={points3}
                  rowGap={2}
                  w={"full"}
                  onSubmit={handleSubmit}
                >
                  <GridItem colSpan={points1}>
                    <FormControl isInvalid={mImage}>
                      <FormLabel htmlFor="imagen">Image</FormLabel>

                      <InputGroup>
                        <Button
                          rightIcon={<DownloadIcon w={6} h={6} />}
                          variant={"outline"}
                          onClick={() => file.current.click()}
                          size="md"
                          fontWeight={"normal"}
                          _hover={{ border: bg }}
                          p={1}
                          value={image}
                          onChange={handleInputChange}
                        >
                          Subir
                        </Button>
                        <Box
                          name="imagen"
                          type={"file"}
                          ref={file}
                          as={"input"}
                          display="none"
                        />
                      </InputGroup>
                      <FormErrorMessage>{mImage && fiel}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid={mNombre}>
                      <FormLabel htmlFor="nombre">Nombre</FormLabel>
                      <Input
                        name="nombre"
                        id="nombre"
                        onChange={handleInputChange}
                        value={nombre}
                        type={"text"}
                        placeholder="Nombre"
                      />
                      <FormErrorMessage>{mNombre && fiel}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid={mPrecio}>
                      <FormLabel htmlFor="precio">Precio</FormLabel>
                      <Input
                        name="precio"
                        id="precio"
                        onChange={handleInputChange}
                        value={precio}
                        type={"text"}
                        placeholder="Precio"
                      />
                      <FormErrorMessage>{mPrecio && fiel}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid={mDescripcion}>
                      <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
                      <Input
                        name="descripcion"
                        id="descripcion"
                        onChange={handleInputChange}
                        value={descripcion}
                        type={"text"}
                        placeholder="Descripcion"
                      />
                      <FormErrorMessage>
                        {mDescripcion && fiel}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid={mCantidad}>
                      <FormLabel htmlFor="cantidad">Cantidad</FormLabel>
                      <NumberInput
                        name="cantidad"
                        id="cantidad"
                        onChange={handleInputChange2}
                        variant={"filled"}
                        value={cantidad}
                        defaultValue={cantidad}
                        min={0}
                        max={20}
                      >
                        <NumberInputField type="number" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{mCantidad && fiel}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid={mCategory}>
                      <FormLabel htmlFor="category">Categoria</FormLabel>
                      <Select
                        name="category"
                        variant="filled"
                        placeholder="Options"
                        value={category}
                        onChange={handleInputChange}
                      >
                        {dataCategory.map(({ nombre }) => (
                          <option key={nombre} value={nombre}>
                            {nombre}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{mCategory && fiel}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <FormControl isInvalid={mDetalles}>
                      <FormLabel htmlFor="detalles">Detalles</FormLabel>
                      <Textarea
                        bg={bg}
                        _focus={brand}
                        variant="filled"
                        name="detalles"
                        id="detalles"
                        value={detalles}
                        onChange={handleInputChange}
                        placeholder="Detalles"
                        size="sm"
                      />
                      <FormErrorMessage>{mDetalles && fiel}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <AlertDialogFooter>
                      <Button
                        variant={"secondary"}
                        ref={cancelRef}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                      <Button variant={"primary"} type="submit" ml={3}>
                        Enviar
                      </Button>
                    </AlertDialogFooter>
                  </GridItem>
                </Grid>
              </VStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

DashboardDialogModal.proptypes = {
  word: Proptypes.string.isRequired,
  modality: Proptypes.func.isRequired,
  setModality: Proptypes.func.isRequired,
};
