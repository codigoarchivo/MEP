import React from "react";

import { DownloadIcon } from "@chakra-ui/icons";

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";

const DialogProduct = ({
  VStack,
  bg,
  points3,
  repeat1,
  points1,
  imgenM,
  file,
  fileE,
  mNombre,
  nombre,
  fiel,
  mPrecio,
  precio,
  mDescripcion,
  descripcion,
  category,
  mCategory,
  detalles,
  mDetalles,
  Grid,
  GridItem,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Button,
  Box,
  Input,
  AlertDialogFooter,
  cancelRef,
  dataCategory,
  brand,
  cantidad,
  mCantidad,
  onClose,
  handleSubmit,
  handleInputChange,
  handleInputChange2,
  handleInputChange3,
}) => {
  return (
    <>
      <VStack justifyContent="center" w="full">
        <Grid
          as={"form"}
          templateRows={`repeat(5, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          onSubmit={handleSubmit}
          columnGap={points3}
          rowGap={2}
          w={"full"}
        >
          <GridItem colSpan={points1}>
            <FormControl isInvalid={imgenM}>
              <FormLabel htmlFor="image">Image</FormLabel>

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
                  onChange={handleInputChange3}
                  name="image"
                  type={"file"}
                  ref={file}
                  as={"input"}
                  display="none"
                />
              </InputGroup>
              <FormErrorMessage>{imgenM && fileE}</FormErrorMessage>
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
              <FormErrorMessage>{mDescripcion && fiel}</FormErrorMessage>
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
              <Button variant={"secondary"} ref={cancelRef} onClick={onClose}>
                Close
              </Button>
              <Button variant={"primary"} type="submit" ml={3}>
                Enviar
              </Button>
            </AlertDialogFooter>
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
};

export default DialogProduct;
