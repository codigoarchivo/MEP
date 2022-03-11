import React, { useEffect } from "react";

import { withRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { Container, VStack } from "@chakra-ui/react";

import CategoryData from "../../components/category/CategoryData";

import Breakpoints from "../../helpers/Breakpoints";

import Layout from "../../components/layout/layout";

import { getDataId } from "../../selectors/getDataId";

import { activeCategory } from "../../actions/category";

const configCategory = ({ router: { query } }) => {
  // selector
  const { list, activeSelect } = useSelector(({ category }) => category);
  // dispatch
  const dispatch = useDispatch();

  const { pid, word } = query;

  useEffect(() => {
    if (word?.toString() === "Add") {
      dispatch(activeCategory(query));
    } else {
      const { idData } = getDataId(list, pid?.toString());
      dispatch(
        activeCategory({
          name: idData?.name,
          word: word?.toString(),
          pid: pid?.toString(),
        })
      );
    }
  }, [query]);

  // breakpoints
  const { points21, points22 } = Breakpoints();

  return (
    <Layout>
      <Container maxW={"container.sm"}>
        <VStack p={points21} mt={points22} boxShadow="2xl">
          <CategoryData activeSelect={activeSelect} />
        </VStack>
      </Container>
    </Layout>
  );
};

export default withRouter(configCategory);
