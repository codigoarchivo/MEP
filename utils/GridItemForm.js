import Proptypes from "prop-types";

import { FormLabel, GridItem, Input, useBreakpoint } from "@chakra-ui/react";

export const GridItemForm = ({
  mb,
  points,
  name,
  na,
  id,
  val,
  type,
  place,
  handle,
  maxlength,
  isReadOnly = false,
  display = "block",
}) => {
  return (
    <>
      <GridItem mb={mb} colSpan={points} display={display}>
        <FormLabel
          fontWeight={"bold"}
          textTransform={"capitalize"}
          htmlFor={na}
        >
          {name}
        </FormLabel>
        <Input
          size={useBreakpoint() === "base" ? "sx" : "md"}
          isReadOnly={isReadOnly}
          maxLength={maxlength}
          name={na}
          id={id}
          onChange={handle}
          value={val}
          type={type}
          placeholder={place}
        />
      </GridItem>
    </>
  );
};

GridItemForm.propTypes = {
  name: Proptypes.string,
  na: Proptypes.string,
  id: Proptypes.string,
  val: Proptypes.string,
  type: Proptypes.string,
  place: Proptypes.string,
  handle: Proptypes.func,
  maxlength: Proptypes.string,
  isReadOnly: Proptypes.bool,
  display: Proptypes.string,
};
