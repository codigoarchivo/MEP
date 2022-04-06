import React from "react";

import { Container } from "@chakra-ui/react";

import CategoryData from "../../components/category/CategoryData";

import Layout from "../../components/layout/layout";

const configCategory = () => {
  return (
    <Layout>
      <Container maxW={"container.sm"}>
        <CategoryData />
      </Container>
    </Layout>
  );
};

export default configCategory;
