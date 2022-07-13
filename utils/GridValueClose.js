import React from "react";

import PropTypes from "prop-types";

import { Button, GridItem, HStack } from "@chakra-ui/react";

const GridValueClose = (data) => {
  return (
    <>
      <GridItem colSpan={2} mt={5}>
        <HStack w={"full"} justifyContent="flex-end" spacing={10}>
          <Button variant={"primary"} type="submit" ml={3} shadow={"lg"}>
            {data.set}
          </Button>
        </HStack>
      </GridItem>
    </>
  );
};

GridValueClose.propTypes = {
  data: PropTypes.string
}
export default GridValueClose;
