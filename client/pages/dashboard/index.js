import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import DashboardScrenn from "../../components/dashboard/DashboardScrenn";

import { listDataPerfil } from "../../actions/search";

import Breakpoints from "../../helpers/Breakpoints";

const DashboardList = ({ uid }) => {
  // breakpoints
  const { displayOff3, points19 } = Breakpoints();
  // selector
  const { listPerfil } = useSelector(({ serch }) => serch);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDataPerfil(uid));
  }, [dispatch]);

  if (!listPerfil) return null;

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
              <Th pb={points19}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listPerfil.map((data) => (
              <DashboardScrenn key={data.id} {...data} />
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
