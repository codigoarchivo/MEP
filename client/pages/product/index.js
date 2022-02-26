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

import ProductScrenn from "../../components/product/ProductScreen";

import { listDataUser } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import { useRouter } from "next/router";

const DashboardList = ({ uid }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { displayOff3, points19, points20 } = Breakpoints();
  // selector
  const { list } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDataUser(uid));
  }, [dispatch]);

  if (!list) return null;

  // add
  const handleAdd = () => {
    router.push({
      pathname: "/product/[pid]",
      query: { pid: "new", word: "Add" },
    });
  };

  return (
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
            {list.map((data) => (
              <ProductScrenn key={data.id} {...data} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export async function getStaticProps() {
  // TODO UID perfil
  const uid = "5511952266559595".toLowerCase();
  return {
    props: {
      uid,
    },
  };
}

export default DashboardList;
