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
  Badge,
} from "@chakra-ui/react";

import FileAll from "../../utils/FileAll";
import GridItemForm from "../../utils/GridItemForm";
import GridItemFormTextarea from "../../utils/GridItemFormTextarea";
import GridValueClose from "../../utils/GridValueClose";
import GridItemFormNumber from "../../utils/GridItemFormNumber";

import ModeColor from "../../helpers/ModeColor";
import { BsPerson, ShopAll } from "../../helpers/IconNew";
import Breakpoints from "../../helpers/Breakpoints";

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
  onClose,
  setUrlImage,
  handleSubmit,
  handleInputChange,
  handleNumberInputCn,
  handleNumberInputPj,
  handleNumberInputPr,
  porcent,
  locale,
  es,
  en,
}) => {
  // mode Color
  const { bg, brand } = ModeColor();
  // selector
  const { listData: list = [] } = useSelector(({ category }) => category);
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();

  return (
    <>
      <HStack spacing={10}>
        <Badge variant="outline">
          <BsPerson w={5} h={5} /> $
          {(1 * pr - (pj * (1 * pr)) / 100).toFixed(1)}
        </Badge>
        <Badge variant="outline">
          <ShopAll w={5} h={5} /> ${((pj * pr) / 100).toFixed(1)}
        </Badge>
      </HStack>
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
            isReadOnly={porcent ? true : false}
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
                "--select--",
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
              <option>--select--</option>
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
  onClose: PropTypes.func.isRequired,
  setUrlImage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNumberInputCn: PropTypes.func.isRequired,
  handleNumberInputPj: PropTypes.func.isRequired,
  handleNumberInputPr: PropTypes.func.isRequired,
  porcent: PropTypes.string,
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};

export default ProductForm;
