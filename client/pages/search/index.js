import React, { useEffect } from "react";

import { useRouter } from "next/router";

import {
  collection,
  query,
  orderBy,
  limit,
  endBefore,
  startAfter,
  onSnapshot,
  limitToLast,
  getDocs,
} from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Wrap,
} from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import {
  categorySerchProduct,
  listDataProduct,
  serchProductList,
} from "../../actions/product";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import {
  useModality,
  useModality2,
  useModality3,
} from "../../hooks/useModality";

import Toast from "../../helpers/Toast";

const serchList = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // dispatch
  const router = useRouter();
  // selector
  const { listSerch } = useSelector(({ product }) => product);
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();
  // modality
  const { modality3, setModality3 } = useModality3(true);

  useEffect(() => {
    const r = router.query.q?.toLowerCase();

    const filtro = data
      .filter((item) => item.na.toLowerCase().includes(r))
      .slice(0, 25);

    if (filtro.length > 0) {
      Toast(`Se encotro: ${filtro.length} resultado`, "success", 5000);
      dispatch(serchProductList(filtro));
    }
  }, [r]);

  useEffect(() => {
    const c = router.query.c?.toLowerCase();

    const filtro = data
      .filter((item) => item.ct.toLowerCase().includes(c))
      .slice(0, 25);
console.log(filtro);
    dispatch(categorySerchProduct(filtro));
  }, [c]);

  const home = () => {
    const firstVisible = listSerch[0].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length === 0) {
        return setModality(true);
      } else {
        handleModality();
        dispatch(listDataProduct(data));
      }
    });
  };

  const previous = () => {
    const firstVisible = listSerch[0].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limitToLast(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length !== 0) {
        setModality3(true);
        dispatch(listDataProduct(data));
      }
    });
  };

  const next = () => {
    const lastVisible = listSerch[listSerch.length - 1].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      startAfter(lastVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);
      if (data.length === 0) {
        return setModality2(true);
      } else {
        handleModality();
        dispatch(listDataProduct(data));
      }
    });
  };

  const handleModality = () => {
    setModality(false);
    setModality2(false);
    setModality3(false);
  };

  return (
    <>
      <Layout>
        <Container maxW="container.xs">
          {!listSerch[0] && (
            <Center py={40}>
              <Heading size={"sm"} textTransform={"uppercase"}>
                Al parecer no encontramos lo que buscas
              </Heading>
            </Center>
          )}

          <Wrap
            spacing={"50px"}
            display={"flex"}
            justifyContent={"space-around"}
            mt={20}
          >
            {listSerch.map((data) => (
              <SerchScreen key={data.id} {...data} />
            ))}
          </Wrap>
          <HStack spacing={10} justifyContent={"center"}>
            <Button
              onClick={home}
              disabled={modality}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <RepeatIcon />
            </Button>
            <Button
              onClick={previous}
              disabled={modality3}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <ChevronLeftIcon w={6} h={6} />
            </Button>
            <Button
              onClick={next}
              disabled={modality2}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <ChevronRightIcon w={6} h={6} />
            </Button>
          </HStack>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  try {
    const q = query(collection(db, "serchs"), orderBy("na", "asc"));

    const el = await getDocs(q);

    const data = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default serchList;
