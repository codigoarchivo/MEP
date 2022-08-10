import React from "react";

import PropTypes from "prop-types";

import { Button, GridItem, HStack } from "@chakra-ui/react";

export const GridValueClose = ({ set, onClose, locale, es, en }) => {
  return (
    <>
      <GridItem colSpan={2} mt={5}>
        <HStack w={"full"} justifyContent="flex-end" spacing={10}>
          <Button variant={"tertiary"} onClick={onClose}>
            {locale === "en-US" ? en.close : es.close}
          </Button>
          <Button variant={"primary"} type="submit" ml={3} shadow={"lg"}>
            {set}
          </Button>
        </HStack>
      </GridItem>
    </>
  );
};

GridValueClose.propTypes = {
  set: PropTypes.string,
  onClose: PropTypes.func,
  locale: PropTypes.string,
  en: PropTypes.object,
  es: PropTypes.object,
};
