import React from "react";

import Link from "next/link";

const NavLink = ({ href, name }) => {
  return (
    <Link href={href} passHref>
      {name}
    </Link>
  );
};
export default NavLink;
