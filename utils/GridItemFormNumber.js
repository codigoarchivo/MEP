import React from "react";

import {
  FormLabel,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const GridItemFormNumber = ({ points, name, na, handle, val, min, max }) => {
  return (
    <>
      <GridItem colSpan={points}>
        <FormLabel htmlFor={na}>{name}</FormLabel>
        <NumberInput
          name={na}
          id={na}
          type={"number"}
          onChange={handle}
          variant={"filled"}
          value={val}
          min={min}
          max={max}
          errorBorderColor={"none"}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
    </>
  );
};

export default GridItemFormNumber;
