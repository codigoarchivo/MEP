import React from "react";

import { Container } from "@chakra-ui/react";

import CategoryData from "../../components/category/CategoryData";

import ShopLayout from "../../components/layout/ShopLayout";

const ConfigCategory = () => {
  return (
    <ShopLayout>
      <Container maxW={"container.sm"}>
        <CategoryData />
      </Container>
    </ShopLayout>
  );
};

export default ConfigCategory;
