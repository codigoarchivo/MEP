import React, { useEffect } from "react";

import { withRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { Center, Container, Spinner, VStack } from "@chakra-ui/react";

import CategoryData from "../../components/category/CategoryData";

import Breakpoints from "../../helpers/Breakpoints";

import Layout from "../../components/layout/layout";

import { activeCategory } from "../../actions/category";

const configCategory = ({ router: { query } }) => {
  // selector
  const { activeSelect, list } = useSelector(({ category }) => category);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (query?.word?.toString() === "Add") {
      dispatch(
        activeCategory({
          word: query?.word?.toString(),
          na: "",
        })
      );
    }

    if (query?.word?.toString() !== "Add") {
      const idData = list.find((x) => x.id === query?.pid?.toString());

      dispatch(
        activeCategory({
          word: query?.word?.toString(),
          na: idData?.na,
          pid: idData?.id,
        })
      );
    }
  }, [dispatch, query, list]);
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

          {activeSelect && <CategoryData activeSelect={activeSelect} />}
        </VStack>
      </Container>
    </Layout>
  );
};

export default withRouter(configCategory);
