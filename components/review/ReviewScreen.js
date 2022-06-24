import React, { useMemo } from "react";

import { useRouter } from "next/router";

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
} from "@chakra-ui/react";

import { Rating } from "react-simple-star-rating";

import ModeColor from "../../helpers/ModeColor";
import Breakpoints from "../../helpers/Breakpoints";
import Calculate from "../../helpers/Calculate";

import {
  checkoutAdd,
  checkoutEdit,
  valueInProduct,
} from "../../actions/checkout";

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
}) => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();
  // mode Color
  const { bg, brand } = ModeColor();
  // Breakpoints
  const { full, bordes } = Breakpoints();

  // usuario del store
  const { uid, displayName, photoURL } = activeSelect;

  // si no esta logueado no puede ver ni editar el review
  if ([uid, displayName].includes(undefined)) {
    router.push("/");
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
          p
        )
      );
      router.back();
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
          p
        )
      );

      router.back();
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
          >
            Como calificarias esta compra
          </Heading>
          <Box w={full}>
            <Rating
              emptyColor="gray"
              onClick={handleRating}
              ratingValue={rat}
              size={50}
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
          >
            Puedes dejar un comentario
          </Heading>
          <Textarea
            name="com"
            value={com}
            onChange={handleInputChange}
            placeholder="Escribe tu comentario"
            size="sm"
            variant="filled"
            bg={bg}
            _focus={brand}
          />
          <Button type={"submit"} variant={"primary"}>
            Enviar
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
