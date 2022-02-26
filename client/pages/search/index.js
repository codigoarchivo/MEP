import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Center, Container, Grid, Spinner } from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import { listData } from "../../actions/search";

import { store } from "../../data/store";

const serchList = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ serch }) => serch);

  useEffect(() => {
    dispatch(listData(data));
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

export async function getStaticProps() {
  // TODO hacer esta busqueda en la api
  const data = store.filter(({ estado }) => parseFloat(estado) === 1);

  return {
    props: {
      data: data,
    },
  };
}

export default serchList;
