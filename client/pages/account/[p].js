import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import { LoginUser } from "../../components/log/loginUser";
import { CreateUser } from "../../components/log/CreateUser";
import { PageNotFound } from "../../components/err/PageNotFound";

import Breakpoints from "../../helpers/Breakpoints";

const account = () => {
  // Breakpoints
  const { auto1 } = Breakpoints();
  // router
  const router = useRouter();
  // query
  const data = router.query.p?.toString();
  // account
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (data) {
      setAccount(data);
    } else {
      setAccount("");
    }
  }, [setAccount]);

  return (
    <>
      <Container maxW="container.xl" p={0}>
        <Flex h={auto1} alignItems={["top", "center"]} justifyContent="center">
          {account === "login" && <LoginUser />}
          {!account && <PageNotFound />}
          {account === "create-user" && <CreateUser />}
        </Flex>
      </Container>
    </>
  );
};
export default account;
