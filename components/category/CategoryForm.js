import React from "react";

import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const CategoryForm = ({
  na,
  pid,
  HStack,
  VStack,
  onClose,
  handleSubmit,
  handleInputChange,
}) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w="full" p={3}>
        <VStack spacing={7}>
          <FormControl >
            <FormLabel htmlFor="na">Nombre</FormLabel>
            <Input
              name="na"
              id="na"
              value={na}
              type={"text"}
              placeholder="Nombre"
              onChange={handleInputChange}
            />
          </FormControl>
          <HStack w={"full"} justifyContent="flex-end">
            <Button variant={"secondary"} onClick={onClose}>
              Close
            </Button>
            <Button variant={"primary"} type="submit" ml={3}>
              {pid}
            </Button>
          </HStack>
        </VStack>
      </chakra.form>
    </>
  );
};

export default CategoryForm;
