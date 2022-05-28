import React from "react";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";

import NavLink from "./Navlink";

import { useSelector } from "react-redux";

import Breakpoints from "./Breakpoints";

import { CategoryAll } from "./IconNew";

const MenuCategoria = () => {
  // Breakpoints
  const { displayOff2, bordes } = Breakpoints();
  // selector
  const { list = [] } = useSelector(({ category }) => category);

  return (
    <Menu>
      <MenuButton
        fontSize={["sm"]}
        leftIcon={<CategoryAll />}
        variant={"primary"}
        as={Button}
        textTransform={"uppercase"}
      >
        Categorias
      </MenuButton>
      <Portal>
        <MenuList display={displayOff2} minWidth={0} border={bordes}>
          {list.map(({ na, id }) => (
            <MenuItem key={id}>
              <NavLink
                href={{
                  pathname: "/search",
                  query: { c: id, n: na },
                }}
                name={na}
                variant={"secondary"}
                fontWeight={"normal"}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default MenuCategoria;
