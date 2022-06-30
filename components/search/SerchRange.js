import React, { useEffect, useMemo, useRef, useState } from "react";

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

const SerchRange = ({ product, dato }) => {
  // dispatch
  const { push } = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();
  // useRef
  const max = useRef(0);
  // useRef
  const min = useRef(0);
  // useRef
  const inc = useRef(0);
  // useRef
  const dec = useRef(0);

  max.current = product.reduce(
    (n, m) => Math.max(Number(n), m.pr),
    -Number.POSITIVE_INFINITY
  );

  min.current = product.reduce(
    (n, m) => Math.min(Number(n), m.pr),
    Number.POSITIVE_INFINITY
  );

  const handleChangeEnd = (r) => {
    push({
      pathname: "/search",
      query: { r, q: "range" },
    });
  };

  return (
    <Stack w={"full"} spacing={"10"} border={bordes} rounded="md" p={5}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"md"} textTransform={"uppercase"} fontWeight={"normal"}>
          {dato}
        </Heading>
      </Box>

      <RangeSlider
        aria-label={[min.current, max.current]}
        defaultValue={[
          (min.current = min.current),
          (inc.current = max.current),
        ]}
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
            $ {min.current === Infinity ? 0 : min.current}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Max</StatLabel>
          <StatNumber fontWeight={"normal"}>
            $ {max.current === -Infinity ? 0 : max.current}
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
