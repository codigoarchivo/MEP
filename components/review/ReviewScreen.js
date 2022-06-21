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

const data = {
  rat: [50, 60, 70, 80, 90],
  com: "hola",
};

const ReviewScreen = ({ message, p, i, g }) => {
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
    initialStates
    // data
  );
  //   valores
  const { rat, com } = values;

  // crea una referencia de lista de rat
  const list = useMemo(
    () =>
      rat !== null ? rat.map((item) => ({ rat: item, nam: String(item) })) : "",
    [rat]
  );

  // Calculate review
  const { listRang, listRang2 } = rat !== null && Calculate(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (i !== "new") {
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
            // nombre usuario
            rat: ratingValue,
            // comentario
            com,
          },
          {
            rat: {
              est: listRang2,
              nam: listRang,
            },
          },
          g,
          p
        )
      );
      if (router.query.li === "1") {
        router.push("/");
      } else {
        router.back();
      }
    } else {
      // edit review
      dispatch(
        checkoutEdit({
          // id del mensaje
          id: router.query.idm,
          // id del producto
          idC: router.query.m,
          // raiting
          rat: ratingValue,
          // comentario nuevo
          com: comentario,
          // creado
          cre: Date.now(),
        })
      );

      dispatch(
        valueInProduct({
          id: router.query.m,
          rat: {
            est: listRang2,
            nam: listRang,
          },
        })
      );
      router.push("/");
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
  message: PropTypes.array,
  p: PropTypes.string,
  i: PropTypes.string,
  g: PropTypes.string,
};

export default ReviewScreen;
