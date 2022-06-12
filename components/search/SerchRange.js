import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import {
  Box,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import { serchProductList } from "../../actions/product";

import { dbProducts } from "../../data/dbProducts";

const SerchRange = ({ product }) => {
  // dispatch
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes } = Breakpoints();
  // selector
  const [listP, setListP] = useState([]);
  // useRef
  const max = useRef(0);
  // useRef
  const min = useRef(0);

  useEffect(() => {
    if (product) {
      setListP(product);
    }
  }, [setListP, product]);

  max.current = listP.reduce(
    (n, m) => Math.max(Number(n), m.pr),
    -Number.POSITIVE_INFINITY
  );

  min.current = listP.reduce(
    (n, m) => Math.min(Number(n), m.pr),
    Number.POSITIVE_INFINITY
  );

  // useState
  const [listPrice, setListPrice] = useState([0, 0]);

  useEffect(() => setListPrice([min.current, max.current]), [min, max]);

  const handleChangeEnd = async (r) => {
    router.push({
      pathname: "/search",
      query: { r },
    });

    setListPrice(r);

    const newData = await dbProducts(r, "dbProSix");

    if (newData.length === 0) {
      return Toast(
        "No hay resultados, reinicia con boton Shop All",
        "info",
        5000
      );
    }

    dispatch(serchProductList(newData));
  };
  return (
    <Stack w={"full"} spacing={"10"} border={bordes} rounded="md" p={5}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"md"} textTransform={"uppercase"} fontWeight={"normal"}>
          Buscar Rango precios
        </Heading>
      </Box>

      <RangeSlider
        defaultValue={[min.current, max.current]}
        min={min.current}
        max={max.current}
        step={5}
        onChangeEnd={(val) => handleChangeEnd(val)}
      >
        <RangeSliderTrack bg="brand.800">
          <RangeSliderFilledTrack bg="brand.700" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0}>
          <Box color="brand.700" as={ChevronLeftIcon} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={6} index={1}>
          <Box color="brand.700" as={ChevronRightIcon} />
        </RangeSliderThumb>
      </RangeSlider>

      <StatGroup w={"full"}>
        <Stat>
          <StatLabel>Min</StatLabel>
          <StatNumber fontWeight={"normal"}>
            $ {listPrice[0] === Infinity ? 0 : listPrice[0]}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Max</StatLabel>
          <StatNumber fontWeight={"normal"}>
            $ {listPrice[1] === -Infinity ? 0 : listPrice[1]}
          </StatNumber>
        </Stat>
      </StatGroup>
    </Stack>
  );
};

SerchRange.propTypes = {
  product: PropTypes.array,
};

export default SerchRange;
