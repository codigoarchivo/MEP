import React from "react";

import { DownloadIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";

import ModeColor from "../../helpers/ModeColor";

const DialogProduct = ({
  HStack,
  file,
  points3,
  repeat1,
  points1,
  onClose,
  nombre,
  precio,
  descripcion,
  category,
  detalles,
  dataCategory,
  cantidad,
  handleSubmit,
  handleInputChange,
  handleInputChange2,
  handleInputChange3,
}) => {
  // mode Color
  const { bg, brand } = ModeColor();

  return (
    <>
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
        </GridItem>

        <GridItem colSpan={points1}>
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <Input
            name="nombre"
            id="nombre"
            onChange={handleInputChange}
            value={nombre}
            type={"text"}
            placeholder="Nombre"
          />
        </GridItem>

        <GridItem colSpan={points1}>
          <FormLabel htmlFor="precio">Precio</FormLabel>
          <Input
            name="precio"
            id="precio"
            onChange={handleInputChange}
            value={precio}
            type={"text"}
            placeholder="Precio"
          />
        </GridItem>

        <GridItem colSpan={points1}>
          <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
          <Input
            name="descripcion"
            id="descripcion"
            onChange={handleInputChange}
            value={descripcion}
            type={"text"}
            placeholder="Descripcion"
          />
        </GridItem>

        <GridItem colSpan={points1}>
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
        </GridItem>

        <GridItem colSpan={points1}>
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
        </GridItem>

        <GridItem colSpan={2}>
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
            size="xs"
          />
        </GridItem>

        <GridItem colSpan={2}>
          <HStack w={"full"} justifyContent="flex-end" spacing={10}>
            <Button variant={"secondary"} onClick={onClose}>
              Close
            </Button>
            <Button variant={"primary"} type="submit" ml={3}>
              Enviar
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default DialogProduct;
