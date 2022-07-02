import React from "react";

import Image from "next/image";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import {
  FormLabel,
  Grid,
  GridItem,
  Select,
  chakra,
  HStack,
  Box,
} from "@chakra-ui/react";

import ModeColor from "../../helpers/ModeColor";

import FileAll from "../../utils/FileAll";
import GridItemForm from "../../utils/GridItemForm";
import GridItemFormTextarea from "../../utils/GridItemFormTextarea";
import GridValueClose from "../../utils/GridValueClose";
import GridItemFormNumber from "../../utils/GridItemFormNumber";

const ProductForm = ({
  im,
  pj,
  na,
  pr,
  ds,
  ct,
  cn,
  dt,
  ps,
  word,
  points3,
  repeat1,
  points1,
  onClose,
  setUrlImage,
  handleSubmit,
  handleInputChange,
  handleNumberInputCn,
  handleNumberInputPj,
  handleNumberInputPr,
  locale,
  es,
  en,
}) => {
  // mode Color
  const { bg, brand } = ModeColor();
  // selector
  const { list = [] } = useSelector(({ category }) => category);

  return (
    <>
      <chakra.form onSubmit={handleSubmit} w={"full"}>
        <Grid
          templateRows={`repeat(5, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
        >
          <GridItem colSpan={points1}>
            <FormLabel htmlFor="im">Image</FormLabel>
            <HStack justifyContent="space-between" w="full">
              <Box w="full">
                <FileAll
                  setUrlImage={setUrlImage}
                  fileName={"fotosTienda"}
                  save={locale === "en" ? en.goup : es.goup}
                  image={locale === "en" ? en.image : es.image}
                />
              </Box>
              <Box w="full" h={"full"} position={"relative"}>
                <Image
                  src={
                    im ||
                    `https://via.placeholder.com/100.png?text=${
                      locale === "en" ? en.picture : es.picture
                    }`
                  }
                  alt="Imagen"
                  width={100}
                  height={100}
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
            </HStack>
          </GridItem>
          {/* nombre del producto */}
          <GridItemForm
            points={points1}
            name={locale === "en" ? en.name : es.name}
            maxlength="50"
            na={"na"}
            val={na}
            type={"text"}
            place={locale === "en" ? en.name : es.name}
            handle={handleInputChange}
          />

          <GridItemFormNumber
            points={points1}
            name={`${locale === "en" ? en.price : es.price} $`}
            na={"pr"}
            handle={handleNumberInputPr}
            val={pr}
            min={1}
            max={10000000000}
          />

          <GridItemFormNumber
            points={points1}
            name={`${locale === "en" ? en.percentage : es.percentage} %`}
            na={"pj"}
            handle={handleNumberInputPj}
            val={pj}
            min={1}
            max={100}
          />

          <GridItemFormNumber
            points={points1}
            name={locale === "en" ? en.quantity : es.quantity}
            na={"cn"}
            handle={handleNumberInputCn}
            val={cn}
            min={1}
            max={100}
          />

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="ps">
              {locale === "en" ? en.pOrS : es.pOrS}
            </FormLabel>
            <Select
              name="ps"
              variant="filled"
              value={ps}
              onChange={handleInputChange}
            >
              {[
                locale === "en" ? en.major.mG : es.major.mG,
                locale === "en" ? en.blog.bG : es.blog.bG,
              ].map((ps, key) => (
                <option key={key} value={ps}>
                  {ps}
                </option>
              ))}
            </Select>
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor="ct">
              {locale === "en" ? en.major.mF : es.major.mF}
            </FormLabel>
            <Select
              name="ct"
              variant="filled"
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
            maxlength="20"
            points={points1}
            name={locale === "en" ? en.description : es.description}
            na={"ds"}
            val={ds}
            type={"text"}
            place={locale === "en" ? en.description : es.description}
            handle={handleInputChange}
          />
          <GridItemFormTextarea
            points={2}
            name={locale === "en" ? en.details : es.details}
            na={"dt"}
            val={dt}
            place={locale === "en" ? en.details : es.details}
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
  im: PropTypes.string,
  pj: PropTypes.number.isRequired,
  na: PropTypes.string.isRequired,
  pr: PropTypes.number.isRequired,
  ds: PropTypes.string.isRequired,
  ct: PropTypes.string.isRequired,
  cn: PropTypes.number.isRequired,
  dt: PropTypes.string.isRequired,
  ps: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  points3: PropTypes.object.isRequired,
  repeat1: PropTypes.object.isRequired,
  points1: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setUrlImage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNumberInputCn: PropTypes.func.isRequired,
  handleNumberInputPj: PropTypes.func.isRequired,
  handleNumberInputPr: PropTypes.func.isRequired,
};

export default ProductForm;
