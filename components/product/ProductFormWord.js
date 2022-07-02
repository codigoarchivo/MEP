import React from "react";

import PropTypes from "prop-types";

import { Button, Heading, chakra } from "@chakra-ui/react";

const ProductFormWord = ({
  HStack,
  word,
  onClose,
  handleSubmit,
  locale,
  es,
  en,
}) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w={"full"} p={3}>
        <Heading mb={6} size={"lg"}>
          {locale === "en" ? en.sure : es.sure}
        </Heading>
        <HStack justifyContent="end" w={"full"}>
          <Button variant={"secondary"} onClick={onClose}>
            {locale === "en" ? en.close : es.close}
          </Button>
          <Button variant={"primary"} type="submit" ml={3}>
            {word}
          </Button>
        </HStack>
      </chakra.form>
    </>
  );
};

ProductFormWord.propTypes = {
  HStack: PropTypes.object.isRequired,
  word: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ProductFormWord;
