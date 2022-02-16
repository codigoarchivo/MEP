import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Flex } from "@chakra-ui/react";

import DashboardScrenn from "../../components/dashboard/DashboardScrenn";

import { listDataPerfil } from "../../actions/search";

const DashboardList = () => {
  // UID perfil
  const uid = "4945959659595929629".toLowerCase();
  // selector
  const { listPerfil } = useSelector(({ serch }) => serch);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDataPerfil(uid));
  }, [dispatch]);

  if (!listPerfil) return null;

  return (
    <Container maxW={"container.lg"}>
      <Flex w={"full"}>
        {listPerfil.map((data) => (
          <DashboardScrenn key={data.id} {...data} />
        ))}
      </Flex>
    </Container>
  );
};

export default DashboardList;
