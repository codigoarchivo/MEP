import React from "react";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import {
  FormLabel,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  chakra,
} from "@chakra-ui/react";

import ModeColor from "../../helpers/ModeColor";
import FileAll from "../../utils/FileAll";
import GridItemForm from "../../utils/GridItemForm";
import GridItemFormTextarea from "../../utils/GridItemFormTextarea";
import GridValueClose from "../../utils/GridValueClose";

const ProductForm = ({
  pj,
  word,
  na,
  pr,
  ds,
  ct,
  cn,
  dt,
  ps,
  points3,
  repeat1,
  points1,
  onClose,
  setUrlImage,
  handleSubmit,
  handleInputChange,
  handleNumberInput,
}) => {
  // mode Color
  const { bg, brand } = ModeColor();
  // selector
  const { list } = useSelector(({ category }) => category);

  const productOrServices = ["Product", "Services"];

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
            <FileAll setUrlImage={setUrlImage} fileName={"fotosTienda"} />
          </GridItem>
          {/* nombre del producto */}
          <GridItemForm
            points={points1}
            name={"Nombre"}
            na={"na"}
            val={na}
            type={"text"}
            place={"Coloca el nombre del producto"}
            handle={handleInputChange}
          />
          {/* precio del producto */}
          <GridItemForm
            points={points1}
            name={"Precio $"}
            na={"pr"}
            val={pr}
            type={"number"}
            place={"Coloca el Precio del producto"}
            handle={handleInputChange}
          />
          {/* Porcentaje del producto */}
          <GridItemForm
            points={points1}
            name={"Porcentaje %"}
            na={"pj"}
            val={pj}
            type={"number"}
            place={"Coloca el Porcentaje"}
            handle={handleInputChange}
          />

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="cn">Cantidad</FormLabel>
            <NumberInput
              name="cn"
              id="cn"
              onChange={handleNumberInput}
              variant={"filled"}
              value={cn}
              min={1}
              max={20}
              defaultValue={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="ps">Producto o Services</FormLabel>
            <Select
              name="ps"
              variant="filled"
              value={ps}
              onChange={handleInputChange}
            >
              {productOrServices.map((ps, key) => (
                <option key={key} value={ps}>
                  {ps}
                </option>
              ))}
            </Select>
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="ct">Categoria</FormLabel>
            <Select
              name="ct"
              variant="filled"
              placeholder="Categoria"
              value={ct}
              onChange={handleInputChange}
            >
              {list.map(({ id, na }) => (
                <option key={id} value={id}>
                  {na}
                </option>
              ))}
            </Select>
          </GridItem>

          {/* descripcion del producto */}
          <GridItemForm
            points={points1}
            name={"Descripción"}
            na={"ds"}
            val={ds}
            type={"text"}
            place={"Coloca una Descripción del producto"}
            handle={handleInputChange}
          />
          <GridItemFormTextarea
            points={2}
            name={"Detalles"}
            na={"dt"}
            val={dt}
            place={"Detalles"}
            handle={handleInputChange}
            bg={bg}
            brand={brand}
          />
          <GridValueClose onClose={onClose} set={word} />
        </Grid>
      </chakra.form>
    </>
  );
};

ProductForm.propTypes = {
  pj: PropTypes.number.isRequired,
  na: PropTypes.string.isRequired,
  pr: PropTypes.number.isRequired,
  ds: PropTypes.string.isRequired,
  ct: PropTypes.string.isRequired,
  cn: PropTypes.number.isRequired,
  dt: PropTypes.string.isRequired,
  ps: PropTypes.string.isRequired,
  points3: PropTypes.object.isRequired,
  repeat1: PropTypes.object.isRequired,
  points1: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setUrlImage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNumberInput: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
};

export default ProductForm;
