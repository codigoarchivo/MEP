import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import CategoryScrenn from "../../components/category/CategoryScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { db } from "../../firebase/config";

import { activeCategory, listDataCategory } from "../../actions/category";

import {
  useModality,
  useModality2,
  useModality3,
} from "../../hooks/useModality";

import { listDataProduct } from "../../actions/product";

const category = ({ data, dataC }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { center, bordes } = Breakpoints();
  // selector
  const { list } = useSelector(({ category }) => category);
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();
  // modality
  const { modality3, setModality3 } = useModality3(true);
  // dispatch
  const dispatch = useDispatch();

  if (activeSelect?.rol === "user") {
    router.push("/");
  }
  useEffect(() => {
    dispatch(listDataProduct(data));
    dispatch(listDataCategory(dataC));
  }, [dispatch, data]);

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

  const home = () => {
    const firstVisible = list[0].na;

    const q = query(
      collection(db, "categories"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 10);

      if (data.length === 0) {
        return setModality(true);
      } else {
        handleModality();
        dispatch(listDataCategory(data));
      }
    });
  };

  const previous = () => {
    const firstVisible = list[0].na;

    const q = query(
      collection(db, "categories"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limitToLast(10)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 10);

      if (data.length !== 0) {
        setModality3(true);
        dispatch(listDataCategory(data));
      }
    });
  };

  const next = () => {
    const lastVisible = list[list.length - 1].na;

    const q = query(
      collection(db, "categories"),
      orderBy("na", "asc"),
      startAfter(lastVisible),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 10);
      if (data.length === 0) {
        return setModality2(true);
      } else {
        handleModality();
        dispatch(listDataCategory(data));
      }
    });
  };

  const handleModality = () => {
    setModality(false);
    setModality2(false);
    setModality3(false);
  };

  return (
    <ShopLayout>
      {activeSelect?.isloggedIn === true && activeSelect?.rol === "owner" ? (
        <Container maxW={"container.sm"} my={10}>
          <Box p={5}>
            {!list[0] && (
              <Center border={bordes} py={30}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  Agrega una categoria
                </Heading>
              </Center>
            )}
            <TableContainer w={"full"} border={bordes}>
              <Table variant="simple">
                <TableCaption>Lista de Categorias</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Categoria</Th>
                    <Th isNumeric textAlign={center}>
                      <Button
                        onClick={handleAdd}
                        variant={"primary"}
                        size="sm"
                        rounded={"sm"}
                        textTransform="uppercase"
                        fontSize={"x-small"}
                      >
                        Agregar
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list.map((data) => (
                    <CategoryScrenn key={data.id} {...data} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <HStack spacing={10} justifyContent={"center"} mt={10}>
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
      ) : (
        ""
      )}
    </ShopLayout>
  );
};

export async function getServerSideProps() {
  try {
    const qC = query(
      collection(db, "categories"),
      limit(25),
      orderBy("na", "asc")
    );
    const q = query(collection(db, "serchs"), limit(25), orderBy("na", "asc"));

    const elC = await getDocs(qC);
    const el = await getDocs(q);

    const data = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const dataC = elC.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        data,
        dataC,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default category;
