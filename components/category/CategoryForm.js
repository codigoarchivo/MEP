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
  HStack,
  VStack,
  onClose,
  handleSubmit,
  handleInputChangeEnEs,
  change,
  naEn,
  naEs,
  locale,
  es,
  en,
  info,
}) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w="full" p={3}>
        <VStack spacing={0} mb={10}>
          <FormControl display={change === false ? "block" : "none"}>
            <FormLabel htmlFor="en">
              {locale === "en" ? en.name : es.name}
            </FormLabel>
            <Input
              name="en"
              id="na"
              value={naEn}
              type={"text"}
              placeholder={locale === "en" ? en.name : es.name}
              onChange={handleInputChangeEnEs}
            />
          </FormControl>

          <FormControl display={change === true ? "block" : "none"}>
            <FormLabel htmlFor="es">
              {locale === "en" ? en.name : es.name}
            </FormLabel>
            <Input
              name="es"
              id="na"
              value={naEs}
              type={"text"}
              placeholder={locale === "en" ? en.name : es.name}
              onChange={handleInputChangeEnEs}
            />
          </FormControl>
        </VStack>
        <HStack w={"full"} justifyContent="flex-end">
          <Button variant={"secondary"} onClick={onClose}>
            {locale === "en" ? en.close : es.close}
          </Button>
          <Button variant={"primary"} type="submit" ml={3}>
            {info}
          </Button>
        </HStack>
      </chakra.form>
    </>
  );
};

CategoryForm.propTypes = {
  HStack: PropTypes.object.isRequired,
  VStack: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChangeEnEs: PropTypes.func.isRequired,
  change: PropTypes.bool.isRequired,
  naEn: PropTypes.string,
  naEs: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
  locale: PropTypes.string,
  info: PropTypes.string,
};
