import React, { useMemo, useState } from "react";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

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

import { dbProducts } from "../../data/dbProducts";

import { serchProductList } from "../../actions/product";

const SerchRange = ({ product, locale, en, es, push }) => {
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes } = Breakpoints();

  const [resRange, setResRange] = useState({});

  let maxN = 0;
  let minN = 0;

  maxN = useMemo(
    () =>
      product.reduce(
        (n, m) => Math.max(Number(n), m.pr),
        -Number.POSITIVE_INFINITY
      ),
    [product]
  );

  minN = useMemo(
    () =>
      product.reduce(
        (n, m) => Math.min(Number(n), m.pr),
        Number.POSITIVE_INFINITY
      ),
    [product]
  );

  const err = locale === "en" ? en.error : es.error;
  const handleChangeEnd = async ({ min, max }) => {
    const product = await dbProducts("", "dbProSix", { min, max });
    console.log(product);
    if (product.length > 0) {
      dispatch(serchProductList(product, err));

      push({
        pathname: "/search",
        query: { min, max },
      });
      setResRange({ min, max });
    }
  };

  return (
    <Stack w={"full"} spacing={"5"} border={bordes} rounded="md" p={4}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"sm"} textTransform={"uppercase"} fontWeight={"normal"}>
          {locale === "en" ? en.search.sA : es.search.sA}
        </Heading>
      </Box>

      <RangeSlider
        aria-label={[minN, maxN]}
        defaultValue={[minN, maxN]}
        min={minN}
        max={maxN}
        step={5}
        onChangeEnd={(val) => handleChangeEnd({ min: val[0], max: val[1] })}
      >
        <RangeSliderTrack bg="brand.800">
          <RangeSliderFilledTrack bg="brand.700" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={5} index={0}>
          <Box color="brand.700" as={ChevronLeftIcon} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={5} index={1}>
          <Box color="brand.700" as={ChevronRightIcon} />
        </RangeSliderThumb>
      </RangeSlider>

      <StatGroup w={"full"}>
        <Stat>
          <StatLabel>Min</StatLabel>
          <StatNumber fontWeight={"normal"}>
            $ {!resRange.min ? minN : resRange.min}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Max</StatLabel>
          <StatNumber fontWeight={"normal"}>
            $ {!resRange.max ? maxN : resRange.max}
          </StatNumber>
        </Stat>
      </StatGroup>
    </Stack>
  );
};

SerchRange.propTypes = {
  product: PropTypes.array,
  data: PropTypes.string,
};

export default SerchRange;
