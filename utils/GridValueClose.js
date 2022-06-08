import React from "react";

import { Button, GridItem, HStack } from "@chakra-ui/react";

const GridValueClose = ({ onClose, set }) => {
  return (
    <>
      <GridItem colSpan={2} mt={5}>
        <HStack w={"full"} justifyContent="flex-end" spacing={10}>
          <Button variant={"secondary"} onClick={onClose}>
            Close
          </Button>
          <Button variant={"primary"} type="submit" ml={3}>
            {set}
          </Button>
        </HStack>
      </GridItem>
    </>
  );
};

export default GridValueClose;
