import React from "react";
import { Button, Heading, chakra } from "@chakra-ui/react";

const CategoryFormWord = ({ HStack, onClose, handleSubmit, pid, VStack }) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w="full" p={3}>
        <VStack spacing={7}>
          <Heading mb={6} size={"lg"}>
            Esta seguro que desea eliminar
          </Heading>
          <HStack justifyContent="end" w={"full"}>
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

export default CategoryFormWord;
