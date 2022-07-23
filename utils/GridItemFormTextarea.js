import PropTypes from "prop-types";

import { FormLabel, GridItem, Textarea } from "@chakra-ui/react";

export const GridItemFormTextarea = ({
  points,
  name,
  na,
  val,
  place,
  handle,
  bg,
  brand,
  mb,
  id,
  size = "xs",
  isReadOnly = false,
  display = "block",
}) => {
  return (
    <>
      <GridItem colSpan={points} mb={mb} display={display}>
        <FormLabel
          fontWeight={"bold"}
          textTransform={"capitalize"}
          htmlFor={na}
        >
          {name}
        </FormLabel>
        <Textarea
          p={{ base: 1, md: 3 }}
          isReadOnly={isReadOnly}
          bg={bg}
          _focus={brand}
          variant="filled"
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
  bg: PropTypes.string,
  brand: PropTypes.object,
  size: PropTypes.string,
  isReadOnly: PropTypes.bool,
};
