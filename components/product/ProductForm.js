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
  Button,
} from "@chakra-ui/react";

import { FileAll } from "../../utils/FileAll";
import { GridItemForm } from "../../utils/GridItemForm";
import { GridItemFormTextarea } from "../../utils/GridItemFormTextarea";
import { GridItemFormNumber } from "../../utils/GridItemFormNumber";

import { ModeColor } from "../../helpers/ModeColor";
import { BsPerson, ShopAll } from "../../helpers/IconNew";
import { Breakpoints } from "../../helpers/Breakpoints";

export const ProductForm = ({
  im,
  pj,
  na,
  pr,
  ds,
  ct,
  cn,
  dt,
  ps,
  change,
  word,
  onClose,
  setUrlImage,
  handleSubmit,
  handleInputChange,
  handleInputChangeEnEs,
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
                  save={change === false ? en.goup : es.goup}
                  image={change === false ? en.image : es.image}
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
            name={change === false ? en.name : es.name}
            maxlength="50"
            na={change === false ? "en" : "es"}
            id={"na"}
            val={na}
            type={"text"}
            place={change === false ? en.name : es.name}
            handle={handleInputChangeEnEs}
          />
          <GridItemFormNumber
            points={points1}
            name={`${change === false ? en.price : es.price} $`}
            na={"pr"}
            handle={handleNumberInputPr}
            val={pr}
            min={1}
            max={10000000000}
          />

          <GridItemFormNumber
            isReadOnly={porcent ? true : false}
            points={points1}
            name={`${change === false ? en.percentage : es.percentage} %`}
            na={"pj"}
            handle={handleNumberInputPj}
            val={pj}
            min={1}
            max={100}
          />

          <GridItemFormNumber
            points={points1}
            name={change === false ? en.quantity : es.quantity}
            na={"cn"}
            handle={handleNumberInputCn}
            val={cn}
            min={1}
            max={100}
          />

          <GridItem colSpan={points1}>
            <FormLabel htmlFor={change === false ? "en" : "es"}>
              {change === false ? en.pOrS : es.pOrS}
            </FormLabel>
            <Select
              name={change === false ? "en" : "es"}
              id={"ps"}
              variant="filled"
              value={ps}
              onChange={handleInputChangeEnEs}
            >
              {[
                "--select--",
                change === false ? en.major.mG : es.major.mG,
                change === false ? en.blog.bG : es.blog.bG,
              ].map((ps, key) => (
                <option key={key} value={ps}>
                  {ps}
                </option>
              ))}
            </Select>
          </GridItem>

          <GridItem colSpan={points1}>
            <FormLabel htmlFor={"ct"}>
              {change === false ? en.major.mF : es.major.mF}
            </FormLabel>
            <Select
              name={"ct"}
              variant="filled"
              value={ct}
              onChange={handleInputChange}
            >
              <option>--select--</option>
              {list.map(({ id, na }) => (
                <option key={id} value={id}>
                  {change === false ? na.en : na.es}
                </option>
              ))}
            </Select>
          </GridItem>

          {/* descripcion del producto */}
          <GridItemForm
            maxlength="20"
            points={points1}
            name={change === false ? en.description : es.description}
            na={change === false ? "en" : "es"}
            id={"ds"}
            val={ds}
            type={"text"}
            place={change === false ? en.description : es.description}
            handle={handleInputChangeEnEs}
          />

          <GridItemFormTextarea
            points={2}
            name={change === false ? en.details : es.details}
            na={change === false ? "en" : "es"}
            id={"dt"}
            val={dt}
            place={change === false ? en.details : es.details}
            handle={handleInputChangeEnEs}
            bg={bg}
            brand={brand}
          />
          <GridItem colSpan={2} mt={5}>
            <HStack w={"full"} justifyContent="flex-end" spacing={10}>
              <Button variant={"secondary"} onClick={onClose}>
                {change === false ? en.close : es.close}
              </Button>
              <Button variant={"primary"} type="submit" ml={3} shadow={"lg"}>
                {word}
              </Button>
            </HStack>
          </GridItem>
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
  change: PropTypes.bool.isRequired,
  word: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setUrlImage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChangeEnEs: PropTypes.func.isRequired,
  handleNumberInputCn: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNumberInputPj: PropTypes.func.isRequired,
  handleNumberInputPr: PropTypes.func.isRequired,
  porcent: PropTypes.string,
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
