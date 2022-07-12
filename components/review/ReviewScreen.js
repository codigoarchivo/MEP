import React, { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import {
  Box,
  Heading,
  HStack,
  chakra,
  VStack,
  Textarea,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Rating } from "react-simple-star-rating";

import ModeColor from "../../helpers/ModeColor";
import Breakpoints from "../../helpers/Breakpoints";
import Calculate from "../../helpers/Calculate";

import { checkoutAdd, checkoutEdit } from "../../actions/checkout";

import useFormAll from "../../hooks/useFormAll";

import { fillColorArray, tooltipArray } from "../../helpers/ToolFill";

const initialStates = {
  rat: null,
  com: "",
};

const ReviewScreen = ({
  calculo = [],
  message = {},
  p = "",
  i = "",
  g = "",
  locale,
  push,
  back,
  es,
  en,
}) => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // mode Color
  const { bg, brand } = ModeColor();
  // Breakpoints
  const { full, bordes, points26 } = Breakpoints();

  // usuario del store
  const { uid, displayName, photoURL } = activeSelect;

  // si no esta logueado no puede ver ni editar el review
  if ([uid, displayName].includes(undefined)) {
    push("/");
  }

  // useFormAll
  const { values, handleInputChange, handleRating } = useFormAll(
    initialStates,
    { ...message, rat: [message.rat] }
  );
  //   valores
  const { rat, com } = values;

  // Calculate product price individual y global
  const { globalRanking, globalPorcentaje } = useMemo(
    () =>
      rat !== null &&
      Calculate([...calculo, ...rat].map((item) => ({ rat: item || 0 }))),
    [calculo, rat]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = locale === "en" ? en.error : es.error;
    if (i !== "new") {
      // edit review
      dispatch(
        checkoutEdit(
          {
            // cuando fue creado
            cre: Date.now(),
            // ranking indiviadual para editar
            rat: rat[0],
            // comentario
            com,
          },
          {
            rat: {
              est: globalPorcentaje,
              nam: globalRanking,
            },
          },
          g,
          p,
          err
        )
      );
      back();
    } else {
      // add review
      dispatch(
        checkoutAdd(
          {
            // cuando fue creado
            cre: Date.now(),
            // photo
            pho: photoURL,
            // nombre del usuario
            nam: displayName,
            // ranking indiviadual para agregar
            rat: rat[0],
            // comentario
            com,
          },
          {
            rat: {
              // porcentaje global  example: 68
              est: globalPorcentaje,
              // ranking global examnple: 3.4
              nam: globalRanking,
            },
          },
          g,
          p,
          err
        )
      );

      back();
    }
  };

  return (
    <HStack my={20}>
      <chakra.form onSubmit={handleSubmit} w={full} border={bordes} p={5}>
        <VStack spacing={10}>
          <Heading
            w={full}
            size={"md"}
            textTransform={"uppercase"}
            fontWeight={"normal"}
            fontSize={points26}
          >
            {locale === "en" ? en.review.rA : es.review.rA}
          </Heading>
          <Box w={full}>
            <Rating
              emptyColor="gray"
              onClick={handleRating}
              ratingValue={rat}
              size={useBreakpointValue({ base: 30, lg: 50 })}
              transition
              allowHalfIcon
              showTooltip
              tooltipArray={tooltipArray}
              fillColorArray={fillColorArray}
            />
          </Box>
          <Heading
            w={full}
            size={"md"}
            textTransform={"uppercase"}
            fontWeight={"normal"}
            fontSize={points26}
          >
            {locale === "en" ? en.review.rB : es.review.rB}
          </Heading>
          <Textarea
            name="com"
            value={com}
            onChange={handleInputChange}
            placeholder={locale === "en" ? en.review.rB : es.review.rB}
            size="sm"
            variant="filled"
            bg={bg}
            _focus={brand}
          />
          <Button w={full} type={"submit"} variant={"primary"}>
            {locale === "en" ? en.send : es.send}
          </Button>
        </VStack>
      </chakra.form>
    </HStack>
  );
};

ReviewScreen.propTypes = {
  message: PropTypes.object,
  calculo: PropTypes.array,
  p: PropTypes.string,
  i: PropTypes.string,
  g: PropTypes.string,
};

export default ReviewScreen;
