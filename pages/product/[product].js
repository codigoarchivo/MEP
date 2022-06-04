import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import ProductScrenn from "../../components/product/ProductScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { productListConfig } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import Paginator from "../../utils/Paginator";

import { dbProducts } from "../../data/dbProducts";

const List = ({ product }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // router
  const router = useRouter();
  // breakpoints
  const { bordes } = Breakpoints();
  // selector
  const { listData } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListConfig(product));
  }, [dispatch, product]);

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
          {!listData[0] && (
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
                {listData.map((data) => (
                  <ProductScrenn key={data.id} {...data} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          {listData.length > 0 && (
            <Paginator
              window={"serchs"}
              word={"na"}
              list={listData}
              firstVisible={listData[0].na}
              lastVisible={listData[listData.length - 1].na}
              newList={productListConfig}
              nLimit={2}
              orHome={"desc"}
              orPrevious={"desc"}
              orNext={"desc"}
              uid={a?.uid}
            />
          )}
        </Box>
      </Container>
    </ShopLayout>
  );
};
export async function getServerSideProps(context) {
  const { product: id } = await context.query;
  try {
    const product = await dbProducts(id, "dbProTwo");

    if (!product) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}
export default List;
