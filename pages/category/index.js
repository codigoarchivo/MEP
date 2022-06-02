import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

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

import Breakpoints from "../../helpers/Breakpoints";

import CategoryScrenn from "../../components/category/CategoryScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { db } from "../../firebase/config";

import { activeCategory, listDataCategory } from "../../actions/category";

import Paginator from "../../utils/Paginator";

const Category = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // breakpoints
  const { center, bordes } = Breakpoints();
  // selector
  const { list } = useSelector(({ category }) => category);
  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);

  if (a?.rol === "user") {
    router.push("/");
  }
  useEffect(() => {
    dispatch(listDataCategory(data));
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

  return (
    <ShopLayout>
      {a?.rol === "owner" ? (
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
          <Box>
            {list.length > 0 && (
              <Paginator
                window={"categories"}
                word={"na"}
                list={list}
                firstVisible={list[0]?.na}
                lastVisible={list[list.length - 1]?.na}
              />
            )}
          </Box>
        </Container>
      ) : (
        ""
      )}
    </ShopLayout>
  );
};

export async function getServerSideProps() {
  try {
    const q = query(
      collection(db, "categories"),
      limit(2),
      orderBy("na", "asc")
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
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default Category;
