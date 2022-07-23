import React from "react";

import PropTypes from "prop-types";

import { Text } from "@chakra-ui/react";

export const ProductFormDetails = ({ dt, change }) => {
  return (
    <>
      <Text lineHeight={2} p={5}>
        {change === false ? dt.en : dt.es}
      </Text>
    </>
  );
};

ProductFormDetails.propTypes = {
  dt: PropTypes.object.isRequired,
  change: PropTypes.bool.isRequired,
};
