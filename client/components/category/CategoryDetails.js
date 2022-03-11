import React from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";

const CategoryDelete = ({ HStack, onClose, handleSubmit, word }) => {
  return (
    <>
      <HStack py={5}>
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
      </HStack>
    </>
  );
};

export default CategoryDelete;
