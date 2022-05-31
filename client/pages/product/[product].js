import React from "react";

import {  Container} from "@chakra-ui/react";

import ProductData from "../../components/product/ProductData";

import ShopLayout from "../../components/layout/ShopLayout";

const ConfigDashboard = () => {
  return (
    <ShopLayout>
      <Container maxW={"container.sm"}>
        <ProductData />
      </Container>
    </ShopLayout>
  );
};
export default ConfigDashboard;
