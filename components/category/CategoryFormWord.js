import React from "react";

import PropTypes from "prop-types";

import { Button, Heading, chakra } from "@chakra-ui/react";

export const CategoryFormWord = ({
  HStack,
  onClose,
  handleSubmit,
  VStack,
  locale,
  es,
  en,
  info,
}) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w="full" p={3}>
        <VStack spacing={7}>
          <Heading mb={6} size={"lg"}>
            {locale === "en" ? en.sure : es.sure}
          </Heading>
          <HStack justifyContent="end" w={"full"}>
            <Button variant={"secondary"} onClick={onClose}>
              {locale === "en" ? en.close : es.close}
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
  HStack: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  VStack: PropTypes.object.isRequired,
  es: PropTypes.object,
  en: PropTypes.object,
  locale: PropTypes.string,
  info: PropTypes.string,
};
