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

import ProductScrenn from "../../components/product/ProductScreen";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import { activeProduct, listDataProduct } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import useAuth from "../../hooks/useAuth";

import {
  useModality,
  useModality2,
  useModality3,
} from "../../hooks/useModality";

const ProductList = ({ data }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { displayOff3, points19, points20 } = Breakpoints();
  // selector
  const { list } = useSelector(({ product }) => product);
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
  // useAuth
  const { isloggedIn } = useAuth();

  if (activeSelect?.rol === "user") {
    router.push("/");
  }

  useEffect(() => {
    dispatch(listDataProduct(data));
  }, [dispatch, data]);

  // add
  const handleAdd = () => {
    dispatch(
      activeProduct({
        word: "Add",
      })
    );

    router.push({
      pathname: "/product/[pid]",
      query: { pid: "new", word: "Add" },
    });
  };

  const home = () => {
    const firstVisible = list[0].na;

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
    const firstVisible = list[0].na;

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
    const lastVisible = list[list.length - 1].na;

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
    <Layout>
      {!list[0] && (
        <Center py={30}>
          <Heading size={"sm"} textTransform={"uppercase"}>
            Agrega una producto
          </Heading>
        </Center>
      )}

      {isloggedIn === true && activeSelect?.rol === "owner" ? (
        <Container maxW={"container.md"} my={10}>
          <Box boxShadow="2xl" p={5}>
            <Table fontSize={points20} size={{ base: "sm" }}>
              <TableCaption>Tus publicaciones en nuestro sitio</TableCaption>
              <Thead>
                <Tr>
                  <Th pb={points19}></Th>
                  <Th pb={points19}>Nombre</Th>
                  <Th pb={points19} display={displayOff3}>
                    Precio
                  </Th>
                  <Th pb={points19} display={displayOff3}>
                    Categoria
                  </Th>
                  <Th pb={points19} textAlign={"center"}>
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
                {list.map((data) => (
                  <ProductScrenn key={data.id} {...data} />
                ))}
              </Tbody>
            </Table>
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
    </Layout>
  );
};

export async function getServerSideProps() {
  const q = query(collection(db, "serchs"), orderBy("na", "asc"), limit(2));

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

export default ProductList;
