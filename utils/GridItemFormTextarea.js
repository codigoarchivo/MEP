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

export default GridItemFormTextarea;
