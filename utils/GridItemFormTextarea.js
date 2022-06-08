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
}) => {
  return (
    <>
      <GridItem colSpan={points}>
        <FormLabel htmlFor={na}>{name}</FormLabel>
        <Textarea
          bg={bg}
          _focus={brand}
          variant="filled"
          name={na}
          id={na}
          value={val}
          onChange={handle}
          placeholder={place}
          size="xs"
        />
      </GridItem>
    </>
  );
};

export default GridItemFormTextarea;
