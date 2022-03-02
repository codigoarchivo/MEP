import React from "react";

import { Container, VStack } from "@chakra-ui/react";

import ProductData from "../../components/product/ProductData";

import { store } from "../../data/store";

import Breakpoints from "../../helpers/Breakpoints";

const configDashboard = ({ dataId }) => {
  // breakpoints
  const { points21, points22 } = Breakpoints();

  return (
    <Container maxW={"container.sm"}>
      <VStack p={points21} mt={points22} boxShadow="2xl">
        <ProductData dataId={dataId} />
      </VStack>
    </Container>
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
