import PropTypes from "prop-types";

import { FormLabel, GridItem, Textarea } from "@chakra-ui/react";

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
  // ModeColor
  const { bg, bg5, bg6, modelA } = ModeColor();
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
          _hover={{ backgroundColor: bg5, borderColor: bg6 }}
          p={{ base: 1, md: 3 }}
          isReadOnly={isReadOnly}
          bg={bg}
          variant={"filled"}
          _focus={{ border: modelA }}
          borderColor={modelA}
          rounded="none"
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
