import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Container,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import CategoryScrenn from "../../components/category/CategoryScreen";

import Breakpoints from "../../helpers/Breakpoints";

import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { listDataCategory } from "../../actions/category";

const CategoryList = ({ data }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { center, points19, points20 } = Breakpoints();
  // selector
  const { list } = useSelector(({ category }) => category);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDataCategory(data));
  }, [dispatch]);

  // add
  const handleAdd = () => {
    router.push({
      pathname: "/category/[pid]",
      query: { pid: "new", word: "Add" },
    });
  };

  return (
    <Layout>
      <Container maxW={"container.sm"} my={10}>
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
              {list.map((data) => (
                <CategoryScrenn key={data.id} {...data} />
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const q = query(collection(db, "categories"));

  const el = await getDocs(q);

  const data = el.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      data: data,
    },
  };
}

export default CategoryList;
