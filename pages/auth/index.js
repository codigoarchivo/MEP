import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import { LoginUser } from "../../components/log/loginUser";

import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Account = () => {
  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);
  // router
  const { locale, push, back, query } = useRouter();

  const valid = [a.uid, a.email].includes(undefined);

  useEffect(() => {
    !valid ? push(query.d || "/") : "";
  }, [push, query, valid]);

  // handleReview
  const handleReview = () => {
    push("/auth/review");
  };

  // Breakpoints
  const { calc } = Breakpoints();

  return (
    <Container maxW="container.sm" px={{ base: 2, md: 4 }}>
      <Flex
        h={calc}
        alignItems={["top", "center"]}
        justifyContent="center"
        py={5}
      >
        <LoginUser
          handleReview={handleReview}
          locale={locale}
          back={back}
          push={push}
          query={query}
          valid={valid}
          es={es}
          en={en}
        />
      </Flex>
    </Container>
  );
};

export default Account;
