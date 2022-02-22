import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

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

import Markeplace from "../../components/product/ProductScreen";

import { listDataUser } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import { useRouter } from "next/router";
import { SmallAddIcon } from "@chakra-ui/icons";

const DashboardList = ({ uid }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { displayOff3, points19 } = Breakpoints();
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
      <VStack>
        <Table fontSize={{ base: ".7rem", sm: "1rem" }} size={{ base: "sm" }}>
          <TableCaption>Tus publicaciones en nuestro sitio</TableCaption>
          <Thead>
            <Tr>
              <Th pb={points19}>Producto</Th>
              <Th pb={points19}>Nombre</Th>
              <Th pb={points19} display={displayOff3}>
                Precio
              </Th>
              <Th pb={points19} display={displayOff3}>
                Categoria
              </Th>
              <Th pb={points19}>
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
              <Markeplace key={data.id} {...data} />
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export async function getStaticProps() {
  // TODO UID perfil
  const uid = "4945959659595929629".toLowerCase();
  return {
    props: {
      uid,
    },
  };
}

export default DashboardList;
