import React from "react";

import { Button, GridItem, HStack } from "@chakra-ui/react";

const GridValueClose = ({ set }) => {
  return (
    <>
      <GridItem colSpan={2} mt={5}>
        <HStack w={"full"} justifyContent="flex-end" spacing={10}>
          <Button variant={"primary"} type="submit" ml={3} shadow={"lg"}>
            {set}
          </Button>
        </HStack>
      </GridItem>
    </>
  );
};

export default GridValueClose;
