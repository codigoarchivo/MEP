import React from "react";

import { withRouter } from "next/router";

import { useSelector } from "react-redux";

import { Center, Container, Spinner, VStack } from "@chakra-ui/react";

import CategoryData from "../../components/category/CategoryData";

import Breakpoints from "../../helpers/Breakpoints";

import Layout from "../../components/layout/layout";

const configCategory = () => {
  // selector
  const { activeSelect } = useSelector(({ category }) => category);

  // breakpoints
  const { points21, points22 } = Breakpoints();

  return (
    <Layout>
      <Container maxW={"container.sm"}>
        <VStack p={points21} mt={points22} boxShadow="2xl">
          {!activeSelect && (
            <Center py={30}>
              <Spinner size="xl" color="brand.800" />
            </Center>
          )}

          {activeSelect && <CategoryData />}
        </VStack>
      </Container>
    </Layout>
  );
};

export default withRouter(configCategory);
