import React from "react";

import { Button, Heading, Text, chakra } from "@chakra-ui/react";

const UserFormWord = ({ HStack, dt, pid, onClose, handleSubmit }) => {
  return (
    <>
      {pid === "Details" && (
        <Text lineHeight={2} p={5}>
          {dt}
        </Text>
      )}
      {pid === "Delete" && (
        <chakra.form onSubmit={handleSubmit} w={"full"} p={3}>
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
        </chakra.form>
      )}
    </>
  );
};

export default UserFormWord;
