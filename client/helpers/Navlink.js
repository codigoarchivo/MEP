import React from "react";

import { Button } from "@chakra-ui/react";

import Link from "next/link";

const NavLink = ({ href, name, variant, size, border, w, px, fontWeight }) => {
  return (
    <Link href={href} passHref>
      <Button
        cursor={"pointer"}
        as={"a"}
        size={size}
        border={border}
        variant={variant}
        w={w}
        px={px}
        fontWeight={fontWeight}
      >
        {name}
      </Button>
    </Link>
  );
};
export default NavLink;
