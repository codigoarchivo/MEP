import React from "react";

import PropTypes from "prop-types";

import { Text } from "@chakra-ui/react";

export const ProductFormDetails = ({ dt }) => {
  return (
    <>
      <Text lineHeight={2} p={5}>
        {dt}
      </Text>
    </>
  );
};

ProductFormDetails.propTypes = {
  dt: PropTypes.string.isRequired,
};
