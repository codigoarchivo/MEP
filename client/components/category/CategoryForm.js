import React from "react";

import {
  Button,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";

const CategoryForm = ({
  name,
  HStack,
  repeat1,
  points1,
  points3,
  onClose,
  handleSubmit,
  handleInputChange,

}) => {

  return (
    <>
      <Grid
        as={"form"}
        templateRows={`repeat(2, 1fr)`}
        templateColumns={repeat1}
        alignItems={"center"}
        onSubmit={handleSubmit}
        columnGap={points3}
        rowGap={2}
        w={"full"}
      >
        <GridItem colSpan={points1}>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            name="name"
            id="name"
            onChange={handleInputChange}
            value={name}
            type={"text"}
            placeholder="Nombre"
          />
        </GridItem>

        <GridItem colSpan={2}>
          <HStack w={"full"} justifyContent="flex-end" spacing={10}>
            <Button variant={"secondary"} onClick={onClose}>
              Close
            </Button>
            <Button variant={"primary"} type="submit" ml={3}>
              Enviar
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default CategoryForm;
