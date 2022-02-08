import React, { useEffect, useState } from "react";

import { Container, Flex } from "@chakra-ui/react";

import { LoginUser } from "../../components/log/loginUser";
import { CreateUser } from "../../components/log/CreateUser";

const account = ({ data }) => {
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
        <Flex h={["auto", "auto", "100vh"]} alignItems={["top", "center"]}>
          {account === "login" ? <LoginUser /> : <CreateUser />}
        </Flex>
      </Container>
    </>
  );
};
export async function getServerSideProps(context) {
  const data = context.query.v?.toString();
  return { props: { data } };
}
export default account;
