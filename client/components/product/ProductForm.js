import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { DownloadIcon } from "@chakra-ui/icons";

import {
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
  chakra,
} from "@chakra-ui/react";

import ModeColor from "../../helpers/ModeColor";

import { listDataCategoryProduct } from "../../actions/category";

const ProductForm = ({
  word,
  na,
  pr,
  ds,
  ct,
  cn,
  dt,
  progress,
  HStack,
  points3,
  repeat1,
  points1,
  onClose,
  handleSubmit,
  handleInputChange,
  handleInputChange2,
  handleInputChange3,
  handleInputChange4,
}) => {
  // mode Color
  const { bg, brand } = ModeColor();
  // file
  const file = useRef();
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ category }) => category);

  useEffect(() => {
    dispatch(listDataCategoryProduct());
  }, [dispatch]);

  return (
    <>
      <chakra.form onSubmit={handleSubmit} w={"full"} p={3}>
        <Grid
          templateRows={`repeat(5, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
          rowGap={2}
        >
          <GridItem colSpan={points1}>
            <FormLabel htmlFor="im">Image</FormLabel>
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
                onChange={handleInputChange3}
                name="im"
                type={"file"}
                ref={file}
                display="none"
              />
            </InputGroup>
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="na">Nombre</FormLabel>
            <Input
              name="na"
              id="na"
              onChange={handleInputChange}
              value={na}
              type={"text"}
              placeholder="Nombre"
            />
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="pr">Precio</FormLabel>
            <Input
              name="pr"
              id="pr"
              onChange={handleInputChange}
              value={pr}
              type={"text"}
              placeholder="Precio"
            />
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="ds">Descripcion</FormLabel>
            <Input
              name="ds"
              id="ds"
              onChange={handleInputChange}
              value={ds}
              type={"text"}
              placeholder="Descripcion"
            />
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="cn">Cantidad</FormLabel>
            <NumberInput
              name="cn"
              id="cn"
              onChange={handleInputChange2}
              variant={"filled"}
              value={cn}
              min={1}
              max={20}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="ct">Categoria</FormLabel>
            <Select
              name="ct"
              variant="filled"
              placeholder="Options"
              value={ct}
              onChange={handleInputChange4}
            >
              {list.map(({ id, na }) => (
                <option key={na} data-value={na} value={id}>
                  {na}
                </option>
              ))}
            </Select>
          </GridItem>

          <GridItem colSpan={2}>
            <FormLabel htmlFor="dt">Detalles</FormLabel>
            <Textarea
              bg={bg}
              _focus={brand}
              variant="filled"
              name="dt"
              id="dt"
              value={dt}
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
                {word}
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </chakra.form>
    </>
  );
};

export default ProductForm;
