import React from "react";

import { Container } from "@chakra-ui/react";

import { useRouter } from "next/router";

import Layout from "../../components/layout/layout";

import UserData from "../../components/user/UserData";

const ajustar = () => {
  // router
  const router = useRouter();
  const data = router.query;

  return (
    <Layout>
      <Container maxWidth={"container.sm"}>
        <UserData {...data} />
      </Container>
    </Layout>
  );
};

export default ajustar;
