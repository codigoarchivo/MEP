import React, { useState } from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Container,
  Heading,
  HStack,
  chakra,
  VStack,
  Textarea,
  Button,
} from "@chakra-ui/react";

import { Rating } from "react-simple-star-rating";

import Layout from "../../../components/layout/layout";

import ModeColor from "../../../helpers/ModeColor";

import Breakpoints from "../../../helpers/Breakpoints";

import { checkoutadd } from "../../../actions/checkout";

import { editProduct } from "../../../actions/product";

const rate = () => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();
  // useState
  const [ratingValue, setRatingValue] = useState(0);
  // useState
  const [comentario, setComentario] = useState("");
  // mode Color
  const { bg, brand } = ModeColor();
  // Breakpoints
  const { full, bordes } = Breakpoints();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComentario(inputValue);
  };

  const handleRating = (rate) => {
    setRatingValue(Number(rate));
  };

  const tooltipArray = [
    "Terrible",
    "Terrible+",
    "Bad",
    "Bad+",
    "Average",
    "Average+",
    "Great",
    "Great+",
    "Awesome",
    "Awesome+",
  ];

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
  ];

  const { uid, displayName, photoURL } = activeSelect;

  // reseña
  const message = {
    uid,
    id: router.query.id,
    li: router.query.li,
    rat: ratingValue,
    com: comentario,
    nam: displayName,
    pho: photoURL,
    cre: Date.now(),
  };

  // agregar reseña
  const product = {
    na: router.query.na,
    pr: router.query.pr,
    ds: router.query.ds,
    ct: router.query.ct,
    cn: router.query.cn,
    dt: router.query.dt,
    im: router.query.im,
    es: router.query.es,
    id: router.query.id,
  };
  // add review
  const handleSubmit = (e) => {
    e.preventDefault();
    // add review
    dispatch(checkoutadd(message));
    // Edit product
    dispatch(
      editProduct({
        ...product,
        rat: [...router.query.rat, ratingValue.toString()],
      })
    );
    // redirect
    if (router.query.li === "1") {
      router.push("/search");
    } else {
      router.push("/search/checkout");
    }
  };

  return (
    <Layout>
      <Container maxW={"container.sm"}>
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
                  ratingValue={ratingValue}
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
                value={comentario}
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
      </Container>
    </Layout>
  );
};

export default rate;
