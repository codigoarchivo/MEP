import React from "react";

import { Button, Heading, Text, chakra } from "@chakra-ui/react";

const ProductFormWord = ({ HStack, dt, word, onClose, handleSubmit }) => {
  return (
    <>
      {word === "Details" && (
        <Text lineHeight={2} p={5}>
          {dt}
        </Text>
      )}
      {word === "Delete" && (
        <chakra.form onSubmit={handleSubmit} w={"full"} p={3}>
          <Heading mb={6} size={"lg"}>
            Esta seguro que desea eliminar
          </Heading>
          <HStack justifyContent="end" w={"full"}>
            <Button variant={"secondary"} onClick={onClose}>
              Close
            </Button>
            <Button variant={"primary"} type="submit" ml={3}>
              {word}
            </Button>
          </HStack>
        </chakra.form>
      )}
    </>
  );
};

export default ProductFormWord;
