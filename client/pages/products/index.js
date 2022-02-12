import React, { useEffect, useState } from "react";

import { Container, Flex, Grid } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import { store } from "../../data/store";

import ListProducts from "./listProducts";

const products = () => {
  // Breakpoints
  const { auto1 } = Breakpoints();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (store) {
      setList(store);
    } else {
      setList([]);
    }
  }, [store, setList]);

  return (
    <>
      <Container maxW="container.lg" p={0} py={50}>
        <Grid
          gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
          gridGap={20}
          flex={"auto"}
        >
          {list.map((data) => (
            <ListProducts key={data.id} {...data} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default products;
