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
  CloseButton,
} from "@chakra-ui/react";

import { Rating } from "react-simple-star-rating";

import { ModeColor } from "../../helpers/ModeColor";
import { Breakpoints } from "../../helpers/Breakpoints";
import { Calculate } from "../../helpers/Calculate";

import { checkoutAdd, checkoutEdit } from "../../actions/checkout";

import { useFormAll } from "../../hooks/useFormAll";

import { fillColorArray, tooltipArray } from "../../helpers/ToolFill";

import { Toast } from "../../helpers/Toast";

const initialStates = {
  rat: null,
  com: "",
};

export const ReviewScreen = ({
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
  const { bg } = ModeColor();
  // Breakpoints
  const { full, bordes, points26, fondo } = Breakpoints();

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
  const { global, globalRanking, globalPorcentaje } = useMemo(
    () =>
      rat !== null &&
      Calculate([...calculo, ...rat].map((item) => ({ rat: item || 0 }))),
    [calculo, rat]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = locale === "en-US" ? en.error : es.error;
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
              // porcentaje global  example: 68
              est: globalPorcentaje,
              // ranking global examnple: 3.4
              nam: globalRanking,
              // mapeo de toda la información
              glo: global,
            },
          },
          g,
          p,
          err,
          {
            id: i,
            // photo
            pho: photoURL,
            // nombre del usuario
            nam: displayName,
          }
        )
      );
      Toast(locale === "en-US" ? en.save : es.save, "success", 5000);
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
            // uid del comprador
            uid,
          },
          {
            rat: {
              // porcentaje global  example: 68
              est: globalPorcentaje,
              // ranking global examnple: 3.4
              nam: globalRanking,
              // mapeo de toda la información
              glo: global,
            },
          },
          g,
          p,
          err,
          uid
        )
      );

      Toast(locale === "en-US" ? en.save : es.save, "success", 5000);
    }
  };

  return (
    <HStack my={{ base: 0, md: 20 }}>
      <chakra.form
        onSubmit={handleSubmit}
        w={full}
        border={bordes}
        p={{ base: 2, md: 5 }}
        backgroundColor={fondo}
        rounded={"lg"}
        boxShadow={"dark-lg"}
      >
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading
            w={full}
            size={"md"}
            textTransform={"uppercase"}
            fontWeight={"normal"}
            fontSize={points26}
          >
            {locale === "en-US" ? en.review.rA : es.review.rA}
          </Heading>
          <CloseButton variant={"tertiary"} onClick={() => back()} />
        </HStack>
        <VStack spacing={10}>
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
            {locale === "en-US" ? en.review.rB : es.review.rB}
          </Heading>
          <Textarea
            name="com"
            value={com}
            onChange={handleInputChange}
            placeholder={locale === "en-US" ? en.review.rB : es.review.rB}
            size="sm"
            variant="filled"
            bg={bg}
            _focus={{ border: bordes }}
            borderColor={bordes}
            border={bordes}
          />
          <Button w={full} type={"submit"} variant={"primary"}>
            {locale === "en-US" ? en.send : es.send}
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
  locale: PropTypes.string,
  push: PropTypes.func,
  back: PropTypes.func,
  es: PropTypes.object,
  en: PropTypes.object,
};
