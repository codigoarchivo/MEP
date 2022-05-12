import React from "react";

import { Button, Heading, Text, chakra } from "@chakra-ui/react";

const ProductFormWord = ({ HStack, dt, product, onClose, handleSubmit }) => {
  return (
    <>
      {product === "details" && (
        <Text lineHeight={2} p={5}>
          {dt}
        </Text>
      )}
      {product === "delete" && (
        <chakra.form onSubmit={handleSubmit} w={"full"} p={3}>
          <Heading mb={6} size={"lg"}>
            Esta seguro que desea eliminar
          </Heading>
          <HStack justifyContent="end" w={"full"}>
            <Button variant={"secondary"} onClick={onClose}>
              Close
            </Button>
            <Button variant={"primary"} type="submit" ml={3}>
              {product}
            </Button>
          </HStack>
        </chakra.form>
      )}
    </>
  );
};

export default ProductFormWord;
