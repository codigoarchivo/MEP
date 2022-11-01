import { useRouter } from "next/router";

import { HStack, Heading, Box, chakra } from "@chakra-ui/react";

import { Global } from "../../../helpers/IconNew";

import { NavLink } from "../../../utils/Navlink";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export const NavbarLocal = () => {
  // useRouter
  const { locale, locales, asPath } = useRouter();

  return (
    <HStack spacing={0} w={"full"} alignItems={"flex-end"} py={5}>
      <Box ml={4} w={6} h={6} as={Global} />{" "}
      {locales.map((lo, i) => (
        <chakra.li key={i} sx={{ listStyle: "none" }}>
          <NavLink
            size={"sm"}
            variant={"tertiary"}
            href={asPath}
            locale={lo}
            name={lo === "en-US" ? "en" : lo}
            px={0}
            w={0}
          />
        </chakra.li>
      ))}
    </HStack>
  );
};
