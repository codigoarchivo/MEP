import React from "react";

import NextLink from "next/link";

import { Link } from "@chakra-ui/react";

const NavLink = ({ href, name }) => {
  return (
    <NextLink href={href} passHref>
      <Link
        _focus={{ ring: 2, ringColor: "transparent" }}
        style={{ textDecoration: "none" }}
      >
        {" "}
        {name}{" "}
      </Link>
    </NextLink>
  );
};
export default NavLink;
