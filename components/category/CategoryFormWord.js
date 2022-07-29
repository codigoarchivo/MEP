import React from "react";

import PropTypes from "prop-types";

import { Button, Heading, chakra } from "@chakra-ui/react";

export const CategoryFormWord = ({
  change,
  HStack,
  onClose,
  handleSubmit,
  VStack,
  es,
  en,
  info,
}) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w="full" p={3}>
        <VStack spacing={7}>
          <Heading mb={6} size={"lg"}>
            {change === false ? en.sure : es.sure}
          </Heading>
          <HStack justifyContent="end" w={"full"}>
            <Button variant={"tertiary"} onClick={onClose}>
              {change === false ? en.close : es.close}
            </Button>
            <Button variant={"primary"} type="submit" ml={3}>
              {info}
            </Button>
          </HStack>
        </VStack>
      </chakra.form>
    </>
  );
};

CategoryFormWord.propTypes = {
  change: PropTypes.bool.isRequired,
  HStack: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  VStack: PropTypes.object.isRequired,
  es: PropTypes.object,
  en: PropTypes.object,
  info: PropTypes.string,
};
