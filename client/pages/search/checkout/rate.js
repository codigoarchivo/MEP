import React, { useEffect, useState } from "react";

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
import Calculate from "../../../helpers/Calculate";

import { checkoutAddEdit } from "../../../actions/checkout";

import { valueInProduct } from "../../../actions/checkout";

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
  // useState
  const [carga, setCarga] = useState([]);

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

  useEffect(() => {
    if (router.query.word === "Edit") {
      setRatingValue(router.query.ratD);
      setComentario(router.query.com);
    } else {
      setRatingValue(0);
      setComentario("");
    }
  }, [setRatingValue, setComentario, router.query]);

  useEffect(() => {
    const saveRat =
      typeof router.query.rat === "string"
        ? [router.query.rat]
        : router.query.rat;

    if (saveRat !== undefined) {
      setCarga([...saveRat, ratingValue]);
    } else {
      setCarga([ratingValue]);
    }
  }, [setCarga, router.query, ratingValue]);

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

  // reseña de usuario
  const message = {
    id: router.query.idm !== undefined && router.query.idm,
    word: router.query.word,
    uid,
    idC: router.query.id,
    li: router.query.li,
    rat: ratingValue,
    com: comentario,
    nam: displayName,
    pho: photoURL,
    cre: Date.now(),
  };
console.log(message);
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

  // crea una referencia de lista de rat
  const lisRat = carga.map((item) => ({
    rat: Number(item),
    nam: item.toString(),
  }));

  // Calculate product price
  const { listRang, listRang2 } = Calculate(lisRat);

  // resultado de la suma de los rangos
  const result = {
    est: listRang2,
    nam: listRang,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // add review
    dispatch(checkoutAddEdit(message));
    // Edit product
    dispatch(
      valueInProduct({
        ...product,
        rat: result,
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
