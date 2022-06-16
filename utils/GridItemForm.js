import { FormLabel, GridItem, Input } from "@chakra-ui/react";

const GridItemForm = ({
  mb,
  points,
  name,
  na,
  val,
  type,
  place,
  handle,
  maxlength,
}) => {
  return (
    <>
      <GridItem mb={mb} colSpan={points}>
        <FormLabel
          fontWeight={"bold"}
          textTransform={"capitalize"}
          htmlFor={na}
        >
          {name}
        </FormLabel>
        <Input
          maxLength={maxlength}
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
