import React from "react";

import PropTypes from "prop-types";

import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const CategoryForm = ({
  na,
  HStack,
  VStack,
  onClose,
  handleSubmit,
  handleInputChange,
  locale,
  es,
  en,
  info,
}) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w="full" p={3}>
        <VStack spacing={7}>
          <FormControl>
            <FormLabel htmlFor="na">
              {locale === "en" ? en.name : es.name}
            </FormLabel>
            <Input
              name="na"
              id="na"
              value={na}
              type={"text"}
              placeholder={locale === "en" ? en.name : es.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <HStack w={"full"} justifyContent="flex-end">
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

CategoryForm.propTypes = {
  na: PropTypes.string.isRequired,
  HStack: PropTypes.object.isRequired,
  VStack: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  es: PropTypes.object,
  en: PropTypes.object,
  locale: PropTypes.string,
  info: PropTypes.string,
};
