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

import ProductScrenn from "../../components/product/ProductScreen";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import { activeProduct, listDataProduct } from "../../actions/product";

import { listDataCategory } from "../../actions/category";

import Breakpoints from "../../helpers/Breakpoints";

import {
  useModality,
  useModality2,
  useModality3,
} from "../../hooks/useModality";
import Toast from "../../helpers/Toast";

const List = ({ data, dataC }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { bordes } = Breakpoints();
  // selector
  const { list } = useSelector(({ product }) => product);
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  const a = activeSelect;
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();
  // modality
  const { modality3, setModality3 } = useModality3(true);
  // dispatch
  const dispatch = useDispatch();

  if (a?.rol === "user") {
    router.push("/");
  }

  useEffect(() => {
    dispatch(listDataProduct(data));
    dispatch(listDataCategory(dataC));
  }, [dispatch, data]);

  // add
  const handleAdd = () => {
    router.push({
      pathname: "/product/[product]",
      query: { product: "add" },
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
      {a?.rol === "owner" ? (
        <Container maxW={"container.lg"} my={10}>
          <Box p={5}>
            {!list[0] && (
              <Center border={bordes} py={30}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  Agrega una producto
                </Heading>
              </Center>
            )}
            <TableContainer w={"full"} border={bordes}>
              <Table>
                <TableCaption>Tus publicaciones en nuestro sitio</TableCaption>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Nombre</Th>
                    <Th>Precio</Th>
                    <Th>Categoria</Th>
                    <Th isNumeric>
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
                    <ProductScrenn key={data.id} {...data} />
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
    </Layout>
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

export default List;
