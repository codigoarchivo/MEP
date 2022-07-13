import { useRouter } from "next/router";

import { HStack, Heading, Box, chakra } from "@chakra-ui/react";

import { Global } from "../../../helpers/IconNew";

import NavLink from "../../../utils/Navlink";

import en from "../../../translations/en";
import es from "../../../translations/es";

const NavbarLocal = () => {
  // useRouter
  const { locale, locales, asPath } = useRouter();
  return (
    <HStack w={"full"} alignItems={"center"} py={5}>
      <Heading textTransform={"uppercase"} size="sm">
        <Box w={6} h={6} as={Global} />{" "}
        {locale === "en" ? en.language : es.language}
      </Heading>

      {locales.map((lo, i) => (
        <chakra.li key={i} sx={{ listStyle: "none" }}>
          <NavLink
            size={"sm"}
            variant={"primary"}
            href={asPath}
            locale={lo}
            name={lo}
            px={0}
            w={0}
          />
        </chakra.li>
      ))}
    </HStack>
  );
};

export default NavbarLocal;
