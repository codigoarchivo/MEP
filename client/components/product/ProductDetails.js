import React from "react";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";

const ProductDetails = ({ HStack, detalles, word, onClose, handleSubmit }) => {
  return (
    <>
      <HStack py={5}>
        {word === "Details" && (
          <Text lineHeight={2} p={5}>
            {detalles}
          </Text>
        )}
        {word === "Delete" && (
          <VStack as={"form"} onSubmit={handleSubmit}>
            <Heading mb={6} size={"lg"}>
              Esta seguro que desea eliminar
            </Heading>
            <HStack justifyContent="end" w={"full"}>
              <Button variant={"secondary"} onClick={onClose}>
                Close
              </Button>
              <Button variant={"primary"} type="submit" ml={3}>
                Enviar
              </Button>
            </HStack>
          </VStack>
        )}
      </HStack>
    </>
  );
};

export default ProductDetails;
