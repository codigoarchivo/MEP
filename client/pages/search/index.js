import React, { useEffect, useState } from "react";

import {
  collection,
  query,
  limit,
  getDocs,
  where,
  onSnapshot,
  startAfter,
  orderBy,
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

import { useModality } from "../../hooks/useModality";

const serchList = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ serch }) => serch);
  // useState
  const [dataList, setDataList] = useState(data);
  
  const { modality, setModality } = useModality();


  // TODO arreglar disable
  // useEffect(() => {
  //   const e = list.indexOf(String(data[0].id));
  //   e ? setModality(true) : setModality(false);
  // }, [setModality]);

  useEffect(() => {
    if (dataList) {
      dispatch(listData(dataList));
    }
  }, [dispatch, dataList]);

  const next = () => {
    const lastVisible = dataList[dataList.length - 1];

    const q = query(
      collection(db, "serchs"),
      where("es", "==", true),
      orderBy("no", "desc"),
      startAfter(lastVisible.no),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      setDataList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  const previous = () => {
    const firstVisible = dataList[0];

    const q = query(
      collection(db, "serchs"),
      where("es", "==", true),
      orderBy("no", "asc"),
      startAfter(firstVisible.no),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      setDataList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
            {list.map(
              (data) => console.log(data)
              // <SerchScreen key={data.id} {...data} />
            )}
          </Grid>
          <HStack justifyContent={"space-evenly"}>
            <Button
              onClick={previous}
              disabled={modality}
              leftIcon={<ArrowLeftIcon />}
              variant={"primary"}
            >
              prev page
            </Button>
            <Button
              onClick={next}
              rightIcon={<ArrowRightIcon />}
              variant={"primary"}
              cursor="pointer"
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
  const q = query(
    collection(db, "serchs"),
    where("es", "==", true),
    orderBy("no", "desc"),
    limit(2)
  );

  const documentSnapshots = await getDocs(q);

  const data = documentSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      data: data,
    },
  };
}

export default serchList;
