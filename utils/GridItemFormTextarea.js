import PropTypes from "prop-types";

import { FormLabel, GridItem, Textarea } from "@chakra-ui/react";

import { Breakpoints } from "../helpers/Breakpoints";
import { ModeColor } from "../helpers/ModeColor";

export const GridItemFormTextarea = ({
  points,
  name,
  na,
  val,
  place,
  handle,
  mb,
  id,
  size = "xs",
  isReadOnly = false,
  display = "block",
}) => {
  const { bordes } = Breakpoints();

  const { bg, modelC } = ModeColor();
  return (
    <>
      <GridItem colSpan={points} mb={mb} display={display}>
        <FormLabel
          fontWeight={"bold"}
          textTransform={"capitalize"}
          htmlFor={na}
          color={modelC}
        >
          {name}
        </FormLabel>
        <Textarea
          p={{ base: 1, md: 3 }}
          isReadOnly={isReadOnly}
          bg={bg}
          variant={"filled"}
          _focus={bordes}
          borderColor={bordes}
          border={bordes}
          name={na}
          id={id}
          value={val}
          onChange={handle}
          placeholder={place}
          size={size}
        />
      </GridItem>
    </>
  );
};

GridItemFormTextarea.propTypes = {
  points: PropTypes.number,
  name: PropTypes.string,
  na: PropTypes.string,
  val: PropTypes.string,
  place: PropTypes.string,
  display: PropTypes.string,
  handle: PropTypes.func,
  size: PropTypes.string,
  isReadOnly: PropTypes.bool,
};
