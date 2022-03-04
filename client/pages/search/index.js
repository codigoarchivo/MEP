import React, { useEffect, useState } from "react";

import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import {
  Button,
  Center,
  Container,
  Grid,
  HStack,
  Spinner,
} from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import { listData } from "../../actions/search";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

const serchList = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ serch }) => serch);
  // useState
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    dispatch(listData(!dataList ? dataList : data));
  }, [dispatch]);

  const scroll = () => {
    const q = query(
      collection(db, "serchs"),
      where("es", "==", true),
      limit(1),
      startAfter(lastvisibility)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docs[snapshot.docs.length - 1];
      setDataList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  return (
    <>
      <Layout>
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
          <HStack justifyContent={"space-evenly"} mt={60}>
            <Button
              // onClick={handleset}
              leftIcon={<ArrowLeftIcon />}
              variant={"primary"}
            >
              prev page
            </Button>
            <Button
              onClick={scroll}
              rightIcon={<ArrowRightIcon />}
              variant={"primary"}
            >
              next page
            </Button>
          </HStack>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const co = collection(db, "serchs");
  const q = query(co, where("es", "==", true), limit(1));
  const documentSnapshots = await getDocs(q);
  const data = documentSnapshots.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    props: {
      data: data,
    },
    revalidate: 10,
  };
}

export default serchList;
