import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Button,
  Container,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import CategoryScreen from "../../components/category/CategoryScreen";

import Breakpoints from "../../helpers/Breakpoints";

import { dataCategory } from "../../data/store";

import { listDataCategory } from "../../actions/category";

import { SmallAddIcon } from "@chakra-ui/icons";

const category = ({ category }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { displayOff3, points19 } = Breakpoints();
  // selector
  const { list } = useSelector(({ category }) => category);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDataCategory(category));
  }, [dispatch]);

  // add
  const handleAdd = () => {
    router.push({
      pathname: "/category/[pid]",
      query: { pid: "new", word: "Add" },
    });
  };
  return (
    <Container maxW={"container.sm"} my={10}>
      <VStack>
        <Table fontSize={{ base: ".7rem", sm: "1rem" }} size={{ base: "sm" }}>
          <TableCaption>Tus Categorias en nuestro sitio</TableCaption>
          <Thead>
            <Tr>
              <Th pb={points19} display={displayOff3}>
                Categoria
              </Th>
              <Th pb={points19} textAlign={"center"} w={0}>
                <Button
                  onClick={handleAdd}
                  leftIcon={<SmallAddIcon w={5} h={5} />}
                  variant={"secondary"}
                >
                  Agregar
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((data) => (
              <CategoryScreen key={data.id} {...data} />
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export async function getStaticProps() {
  // TODO UID perfil
  return {
    props: {
      category: dataCategory,
    },
  };
}

export default category;
