import React from "react";

import { Container } from "@chakra-ui/react";

import { useRouter } from "next/router";

import ShopLayout from "../../components/layout/ShopLayout";

import UserData from "../../components/user/UserData";

const ajustar = () => {
  // router
  const router = useRouter();
  const data = router.query;

  return (
    <ShopLayout>
      <Container maxWidth={"container.sm"}>
        <UserData {...data} />
      </Container>
    </ShopLayout>
  );
};

export default ajustar;
