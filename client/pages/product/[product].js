import React from "react";

import {  Container} from "@chakra-ui/react";

import ProductData from "../../components/product/ProductData";

import Layout from "../../components/layout/layout";

const configDashboard = () => {
  return (
    <Layout>
      <Container maxW={"container.sm"}>
        <ProductData />
      </Container>
    </Layout>
  );
};
export default configDashboard;
