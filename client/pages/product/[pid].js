import React from "react";

import { Container, VStack } from "@chakra-ui/react";

import ProductData from "../../components/product/ProductData";

import { store } from "../../data/store";

import Breakpoints from "../../helpers/Breakpoints";
import Layout from "../../components/layout/layout";

const configDashboard = ({ dataId }) => {
  // breakpoints
  const { points21, points22 } = Breakpoints();

  return (
    <Layout>
      <Container maxW={"container.sm"}>
        <VStack p={points21} mt={points22} boxShadow="2xl">
          <ProductData dataId={dataId} />
        </VStack>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const dataR = store.find((x) => x.id === context.query.pid.toString());
  const dataId = {
    data: dataR ? dataR : null,
    word: context.query.word.toString(),
  };
  return { props: { dataId } };
}
export default configDashboard;
