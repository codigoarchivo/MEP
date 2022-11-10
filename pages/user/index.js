import { useEffect } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { Container, Heading, Stack, VStack } from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";

import ShopLayout from "../../components/layout/ShopLayout";

import { EditUserPublic } from "../../components/user/EditUserPublic";

import { UserPublic } from "../../components/user/UserPublic";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const User = () => {
  // Breakpoints
  const { content5 } = Breakpoints();

  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);
  // router
  const { locale, replace, asPath } = useRouter();

  const valid = [a.uid, a.email].includes(undefined);

  useEffect(() => {
    valid ? replace(`/auth?d=${asPath}`) : "";
  }, [replace, valid]);

  return (
    <ShopLayout title={locale === "en-US" ? en.user.uA : es.user.uA}>
      <Container
        maxW={"container.lg"}
        px={{ base: 2, md: 4 }}
        py={{ base: 0, md: 20 }}
      >
        <VStack mb={{ base: 5, md: 10 }}>
          <Heading textTransform={"capitalize"} size={"lg"} textAlign="center">
            {locale === "en-US" ? en.user.uA : es.user.uA}
          </Heading>
          <Heading
            size={"sm"}
            textTransform={"capitalize"}
            fontWeight={"normal"}
          >
            {locale === "en-US" ? en.user.uB : es.user.uB}
          </Heading>
        </VStack>
        <Stack
          flexDirection={content5}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={0}
        >
          {/* user public */}
          <UserPublic />

          {/* edit user public */}
          <EditUserPublic />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export default User;
