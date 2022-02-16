import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Center, Container, Grid, Spinner } from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import { listData } from "../../actions/search";

const serchList = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ serch }) => serch);

  useEffect(() => {
    dispatch(listData());
  }, [dispatch]);

  return (
    <>
      <Container maxW="container.lg" my={50}>
        <Grid
          gridTemplateColumns={"repeat(auto-fit, minmax(224px, 1fr))"}
          gridGap={3}
          justifyContent="center"
        >
          {!list[0] && (
            <Center my={30}>
              <Spinner size="xl" color="brand.800" />
            </Center>
          )}
          {list.map((data) => (
            <SerchScreen key={data.id} {...data} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default serchList;
