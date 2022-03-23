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

import { activeSerch, listData } from "../../actions/search";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import { useModality, useModality2 } from "../../hooks/useModality";

const serchList = ({ data, dataB }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list, activeList } = useSelector(({ serch }) => serch);
  // useState
  const [dataList, setDataList] = useState([]);
  // firstOrEnd
  const [firstOrEnd, setfirstOrEnd] = useState({});
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();

  useEffect(() => {
    if (activeList) {
      setDataList(activeList);
    } else {
      setDataList(data);
      setfirstOrEnd(dataB);
    }
    return () => {
      setModality(true);
      setModality2(false);
    };
  }, []);

  useEffect(() => {
    setModality(dataList.map((x) => x.id).includes(firstOrEnd?.first));
    setModality2(dataList.map((x) => x.id).includes(firstOrEnd?.end));

    firstOrEnd?.first && dispatch(listData(dataList));

    return () => {
      setModality(true);
      setModality2(false);
    };
  }, [dataList, firstOrEnd]);

  const next = () => {
    const lastVisible = dataList && dataList[dataList.length - 1];

    const q = query(
      collection(db, "serchs"),
      where("es", "==", true),
      orderBy("no", "desc"),
      startAfter(lastVisible?.no),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      setDataList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    closeSave();
  };

  const previous = () => {
    const firstVisible = dataList && dataList[0];

    const q = query(
      collection(db, "serchs"),
      where("es", "==", true),
      orderBy("no", "asc"),
      startAfter(firstVisible?.no),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      setDataList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    closeSave();
  };

  const closeSave = () => {
    dispatch(activeSerch(list));
    dispatch(listData([]));
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
    orderBy("no", "desc")
  );

  const el = await getDocs(q);

  const data = el.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .slice(0, 2);

  const dataBotton = {
    first: el.docs[0].id,
    end: el.docs[el.docs.length - 1].id,
  };

  return {
    props: {
      data: data,
      dataB: dataBotton,
    },
  };
}

export default serchList;
