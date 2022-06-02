import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, limit, query, where } from "firebase/firestore";

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

import ShopLayout from "../../components/layout/ShopLayout";

import { db } from "../../firebase/config";

import { listDataProduct } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import Paginator from "../../utils/Paginator";

const List = ({ data }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { bordes } = Breakpoints();
  // selector
  const { list } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDataProduct(data));
  }, [dispatch, data]);

  // add
  const handleAdd = () => {
    router.push({
      pathname: "/set/[set]",
      query: { set: "add" },
    });
  };

  return (
    <ShopLayout>
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
        <Box>
          {list.length > 0 && (
            <Paginator
              window={"serchs"}
              word={"na"}
              list={list}
              firstVisible={list[0].na}
              lastVisible={list[list.length - 1].na}
            />
          )}
        </Box>
      </Container>
    </ShopLayout>
  );
};

export async function getServerSideProps(context) {
  const { product } = await context.query;
  try {
    const ref = collection(db, "serchs");
    const q = query(ref, where("uid", "==", product.toString()), limit(2));
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
    return { props: {} };
  }
}

export default List;
