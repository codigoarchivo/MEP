import { FormLabel, GridItem, Textarea } from "@chakra-ui/react";

const GridItemFormTextarea = ({
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

export default GridItemFormTextarea;
