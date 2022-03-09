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
  HStack,
  Spinner,
  Wrap,
} from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import { listData } from "../../actions/search";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import { useModality, useModality2 } from "../../hooks/useModality";

import { DissableBotton } from "../../actions/ui";

const serchList = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ serch }) => serch);
  // selector
  const { activeDisabled } = useSelector(({ ui }) => ui);
  // useState
  const [dataList, setDataList] = useState([]);
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();

  useEffect(() => {
    setDataList(data);
    dispatch(DissableBotton());

    return () => {
      setModality(true);
      setModality2(false);
    };
  }, [dispatch]);

  useEffect(() => {
    setModality(dataList.map((x) => x.id).includes(activeDisabled?.first));
    setModality2(dataList.map((x) => x.id).includes(activeDisabled?.end));

    activeDisabled?.first && dispatch(listData(dataList));

    return () => {
      setModality(true);
      setModality2(false);
    };
  }, [dataList, activeDisabled]);

  const next = () => {
    const lastVisible = dataList[dataList.length - 1];

    const q = query(
      collection(db, "serchs"),
      where("es", "==", true),
      orderBy("no", "desc"),
      startAfter(lastVisible.no),
      limit(1)
    );

    onSnapshot(q, (snapshot) => {
      setDataList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    setDataList([]);
  };

  const previous = () => {
    const firstVisible = dataList[0];

    const q = query(
      collection(db, "serchs"),
      where("es", "==", true),
      orderBy("no", "asc"),
      startAfter(firstVisible.no),
      limit(1)
    );

    onSnapshot(q, (snapshot) => {
      setDataList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    setDataList([]);
  };

  return (
    <>
      <Layout>
        <Container maxW="container.lg">
          {!list[0] && (
            <Center py={30}>
              <Spinner size="xl" color="brand.800" />
            </Center>
          )}

          <Wrap py={"10"}>
            {list.map((data) => (
              <SerchScreen key={data.id} {...data} />
            ))}
          </Wrap>
          
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
              disabled={modality2}
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
    limit(1)
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
