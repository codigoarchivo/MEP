import React from "react";

import {
  collection,
  query,
  orderBy,
  limit,
  endBefore,
  startAfter,
  onSnapshot,
  limitToLast,
} from "firebase/firestore";

import { useSelector } from "react-redux";

import {
  Button,
  Center,
  Container,
  HStack,
  Spinner,
  Wrap,
} from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import { productSerchCategoryDataProduct } from "../../actions/product";

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

const category = () => {
  // selector
  const { productSerchCategory } = useSelector(({ product }) => product);
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();
  // modality
  const { modality3, setModality3 } = useModality3(true);

  const home = () => {
    const firstVisible = productSerchCategory[0].na;

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
    const firstVisible = productSerchCategory[0].na;

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
    const lastVisible = productSerchCategory[productSerchCategory.length - 1].na;

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
          {!productSerchCategory[0] && (
            <Center py={30}>
              <Spinner size="xl" color="brand.800" />
            </Center>
          )}

          <Wrap
            spacing={"50px"}
            display={"flex"}
            justifyContent={"space-around"}
            mt={20}
          >
            {productSerchCategory.map((data) => (
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

export default category;
