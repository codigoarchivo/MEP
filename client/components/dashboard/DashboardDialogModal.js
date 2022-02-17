import React, { useRef } from "react";

import Proptypes from "prop-types";

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
  Tooltip,
} from "@chakra-ui/react";

import { DownloadIcon, QuestionIcon } from "@chakra-ui/icons";

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

export const DashboardDialogModal = ({
  modality,
  setModality,
  word,
  data,
  VStack,
}) => {
  // cerrar
  const onClose = () => setModality(false);
  // file
  const file = useRef();
  // ref
  const cancelRef = useRef();
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();
  // mode Color
  const { textError, bgTextError, bg, brand } = ModeColor();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const { nameE } = Validator(values);
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
                >
                  <GridItem colSpan={points1}>
                    <FormControl isInvalid>
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
                        >
                          Subir
                        </Button>
                        <Box
                          name="imagen"
                          onChange={handleInputChange}
                          value={image}
                          type={"file"}
                          ref={file}
                          as={"input"}
                          display="none"
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid>
                      <FormLabel htmlFor="nombre">Nombre</FormLabel>
                      <Input
                        name="nombre"
                        id="nombre"
                        onChange={handleInputChange}
                        value={nombre}
                        type={"text"}
                        placeholder="Nombre"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={points1}>
                    <FormControl isInvalid>
                      <FormLabel htmlFor="precio">Precio</FormLabel>
                      <Input
                        name="precio"
                        id="precio"
                        onChange={handleInputChange}
                        value={precio}
                        type={"text"}
                        placeholder="Precio"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid>
                      <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
                      <Input
                        name="descripcion"
                        id="descripcion"
                        onChange={handleInputChange}
                        value={descripcion}
                        type={"text"}
                        placeholder="Descripcion"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={points1}>
                    <FormControl isInvalid>
                      <FormLabel htmlFor="cantidad">Cantidad</FormLabel>
                      <NumberInput
                        // name="cantidad"
                        // id="cantidad"
                        // onChange={handleInputChange}
                        // value={cantidad}
                        variant={"filled"}
                        defaultValue={0}
                        min={0}
                        max={20}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={points1}>
                    <FormControl isInvalid>
                      <FormLabel htmlFor="lastName">Categoria</FormLabel>
                      <Select
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
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl isInvalid>
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
                      <Button variant={"primary"} ml={3}>
                        Change
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
