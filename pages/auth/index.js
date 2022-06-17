import React from "react";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import LoginUser from "../../components/log/loginUser";

import { useSelector } from "react-redux";

const Account = () => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // router
  const router = useRouter();

  if (activeSelect) {
    router.push("/");
  }

  // handleReview
  const handleReview = () => {
    router.push({
      pathname: "/auth/[pid]",
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

export default Account;
