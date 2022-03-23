import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

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

import ProductScrenn from "../../components/product/ProductScreen";

import Layout from "../../components/layout/layout";

import { listDataUser } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import useAuth from "../../hooks/useAuth";

const ProductList = ({ uid }) => {
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
    dispatch(listDataUser(uid));
  }, [dispatch]);

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
                  <Th pb={points19}>Tienda</Th>
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
                {!list && (
                  <Center py={30}>
                    <Spinner size="xl" color="brand.800" />
                  </Center>
                )}
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
  // TODO UID perfil
  const uid = "5511952266559595".toLowerCase();
  return {
    props: {
      uid,
    },
  };
}

export default ProductList;
