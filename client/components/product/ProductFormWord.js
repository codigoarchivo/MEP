import React from "react";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";

const ProductFormWord = ({ HStack, dt, word, onClose, handleSubmit }) => {
  return (
    <>
      <HStack py={5}>
        {word === "Details" && (
          <Text lineHeight={2} p={5}>
            {dt}
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
                {word}
              </Button>
            </HStack>
          </VStack>
        )}
      </HStack>
    </>
  );
};

export default ProductFormWord;
