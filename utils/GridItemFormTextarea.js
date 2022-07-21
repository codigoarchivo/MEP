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
  size = "xs",
  isReadOnly = false,
}) => {
  return (
    <>
      <GridItem colSpan={points} mb={mb}>
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
          id={na}
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
  handle: PropTypes.func,
  bg: PropTypes.string,
  brand: PropTypes.object,
  size: PropTypes.string,
  isReadOnly: PropTypes.bool,
};
