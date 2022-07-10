import { FormLabel, GridItem, Input } from "@chakra-ui/react";

const GridItemForm = ({
  mb,
  points,
  all,
  name,
  na,
  val,
  type,
  place,
  handle,
  maxlength,
  isReadOnly = false,
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
          size={all}
          isReadOnly={isReadOnly}
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
