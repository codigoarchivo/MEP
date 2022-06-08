import React from "react";

import { Text } from "@chakra-ui/react";

const ProductFormDetails = ({ dt }) => {
  return (
    <>
      <Text lineHeight={2} p={5}>
        {dt}
      </Text>
    </>
  );
};

export default ProductFormDetails;
