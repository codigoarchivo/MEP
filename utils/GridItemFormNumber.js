import PropTypes from "prop-types";

import {
  FormLabel,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import { ModeColor } from "../helpers/ModeColor";

export const GridItemFormNumber = ({
  points,
  name,
  na,
  handle,
  val,
  min,
  max,
  isReadOnly = false,
}) => {
  const { modelC } = ModeColor();
  return (
    <GridItem colSpan={points}>
      <FormLabel color={modelC} htmlFor={na}>
        {name}
      </FormLabel>
      <NumberInput
        isReadOnly={isReadOnly}
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
  );
};

GridItemFormNumber.propTypes = {
  points: PropTypes.object,
  name: PropTypes.string,
  na: PropTypes.string,
  handle: PropTypes.func,
  va: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  isReadOnly: PropTypes.bool,
};
