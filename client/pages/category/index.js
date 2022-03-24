import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import CategoryScrenn from "../../components/category/CategoryScreen";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import {
  activeCategory,
  activeCategoryOld,
  listDataCategory,
} from "../../actions/category";

import useAuth from "../../hooks/useAuth";

import { useModality, useModality2 } from "../../hooks/useModality";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const CategoryList = ({ data, dataBotton }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { center, points19, points20 } = Breakpoints();
  // selector
  const { list, activeSelectOld } = useSelector(({ category }) => category);
  // selector
  const { activeSelect: category } = useSelector(({ auth }) => auth);
  // useState
  const [dataList, setDataList] = useState([]);
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();
  // useAuth
  const { isloggedIn } = useAuth();
  // dispatch
  const dispatch = useDispatch();

  if (category?.rol === "user") {
    router.push("/");
  }
  useEffect(() => {
    if (activeSelectOld) {
      setDataList(activeSelectOld);
    } else {
      // setDataList(data);
      dispatch(listDataCategory(data));
    }
  }, []);

  // add
  const handleAdd = () => {
    dispatch(
      activeCategory({
        word: "Add",
      })
    );

    router.push({
      pathname: "/category/[pid]",
      query: { pid: "new", word: "Add" },
    });
  };

  
  const previous = () => {
    const firstVisible = list[0].na;

    const q = query(
      collection(db, "categories"),
      orderBy("na"),
      endAt(firstVisible),
      limitToLast(4)
    );

    onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(data);
      if (data.length === 0) {
        return setModality(true);
      } else {
        setModality(false);
        setModality2(false);
        dispatch(listDataCategory(data));
      }
    });

    closeSave();
  };


  const next = () => {
    const lastVisible = list[list.length - 1].na;

    const q = query(
      collection(db, "categories"),
      orderBy("na", "asc"),
      startAt(lastVisible),
      limit(4)
    );
    onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (data.length === 0) {
        return setModality2(true);
      } else {
        setModality(false);
        setModality2(false);
        dispatch(listDataCategory(data));
      }
    });

    closeSave();
  };

  const closeSave = () => {
    dispatch(activeCategoryOld(list));
  };

  return (
    <Layout>
      {!list[0] && (
        <Center py={30}>
          <Heading size={"sm"} textTransform={"uppercase"}>
            Agrega una categoria
          </Heading>
        </Center>
      )}

      {isloggedIn === true && category?.rol === "owner" ? (
        <Container maxW={"container.sm"} my={20}>
          <Box boxShadow="2xl" p={5}>
            <Table fontSize={points20} size={{ base: "sm" }}>
              <TableCaption>Lista de categorias</TableCaption>
              <Thead>
                <Tr>
                  <Th pb={points19} textAlign={center}>
                    Nombre
                  </Th>
                  <Th pb={points19} textAlign={center}>
                    <Button
                      onClick={handleAdd}
                      variant={"primary"}
                      size="sm"
                      rounded={"sm"}
                      textTransform="uppercase"
                      fontSize={points20}
                    >
                      Agregar
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {!list && (
                  <Center py={30}>
                    <Spinner size="xl" color="brand.800" />
                  </Center>
                )}

                {list.map((data) => (
                  <CategoryScrenn key={data.id} {...data} />
                ))}
              </Tbody>
            </Table>
          </Box>
          <HStack justifyContent={"space-evenly"} mt={10}>
            <Button
              onClick={previous}
              disabled={modality}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <ArrowLeftIcon />
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
              <ArrowRightIcon />
            </Button>
          </HStack>
        </Container>
      ) : (
        ""
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const q = query(collection(db, "categories"), limit(4), orderBy("na", "asc"));
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
}

export default CategoryList;
