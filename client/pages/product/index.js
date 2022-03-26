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
  where,
} from "firebase/firestore";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Spinner,
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
        </Container>
      ) : (
        ""
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const q = query(
    collection(db, "serchs"),
    where("es", "==", true),
    orderBy("na", "asc"),
    limit(2)
  );

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
