import React, { useMemo, useState } from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

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

const SerchRange = ({ product, locale, en, es }) => {
  // Breakpoints
  const { bordes } = Breakpoints();

  const [resRange, setResRange] = useState({});

  const { push } = useRouter();

  const handleChangeEnd = ([min = 0, max = 0]) => {
    setResRange({ min, max });
    push({
      pathname: "/search",
      query: { min, max },
    });
  };

  const maxN = useMemo(
    () =>
      product.reduce(
        (n, m) => Math.max(Number(n), m.pr),
        -Number.POSITIVE_INFINITY
      ),
    [product]
  );

  const minN = useMemo(
    () =>
      product.reduce(
        (n, m) => Math.min(Number(n), m.pr),
        Number.POSITIVE_INFINITY
      ),
    [product]
  );

  maxN = maxN === -Infinity ? 100 : maxN;
  minN = minN === Infinity ? 1 : minN;
  
  return (
    <Stack w={"full"} spacing={"5"} border={bordes} rounded="md" p={4}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"sm"} textTransform={"uppercase"} fontWeight={"normal"}>
          {locale === "en" ? en.search.sA : es.search.sA}
        </Heading>
      </Box>

      <RangeSlider
        defaultValue={[minN, maxN]}
        min={minN}
        max={maxN}
        step={5}
        onChangeEnd={(val) => handleChangeEnd(val)}
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
  product: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  es: PropTypes.object.isRequired,
  en: PropTypes.object.isRequired,
};

export default SerchRange;
