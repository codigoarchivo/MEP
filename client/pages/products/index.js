import React, { useEffect, useState } from "react";

import { Container, Grid } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import ListScreen from "../../components/products/ListScreen";

import { store } from "../../data/store";

const products = ({ posts }) => {
  // Breakpoints
  const { auto1 } = Breakpoints();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (posts) {
      setList(posts);
    } else {
      setList([]);
    }
  }, [posts, setList]);

  return (
    <>
      <Container maxW="container.lg" my={50}>
        <Grid
          gridTemplateColumns={"repeat(auto-fit, minmax(224px, 1fr))"}
          gridGap={3}
          justifyContent="center"
        >
          {list.map((data) => (
            <ListScreen key={data.id} {...data} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const posts = store;
  return { props: { posts } };
}
export default products;
