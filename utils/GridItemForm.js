import { FormLabel, GridItem, Input } from "@chakra-ui/react";

const GridItemForm = ({ points, name, na, val, type, place, handle }) => {
  return (
    <>
      <GridItem colSpan={points}>
        <FormLabel htmlFor={na}>{name}</FormLabel>
        <Input
          name={na}
          id={na}
          onChange={handle}
          value={val}
          type={type}
          placeholder={place}
        />
      </GridItem>
    </>
  );
};

export default GridItemForm;
