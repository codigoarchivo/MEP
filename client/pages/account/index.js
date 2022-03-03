import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import LoginUser from "../../components/log/loginUser";

import useAuth from "../../hooks/useAuth";

const login = () => {
  // useAuth
  const { isloggedIn } = useAuth();
  // router
  const router = useRouter();

  if (isloggedIn) {
    router.push("/");
  }

  // handleReview
  const handleReview = () => {
    router.push({
      pathname: "/account/[pid]",
      query: { pid: "review", word: "Email" },
    });
  };

  return (
    <Container maxW="container.sm">
      <Flex alignItems={["top", "center"]} justifyContent="center">
        <LoginUser handleReview={handleReview} />
      </Flex>
    </Container>
  );
};

export default login;
