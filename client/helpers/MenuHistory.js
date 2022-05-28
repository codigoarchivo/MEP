import React from "react";

import { useSelector } from "react-redux";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";

import NavLink from "./Navlink";

import Breakpoints from "./Breakpoints";

const MenuHistory = ({ color }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // Breakpoints
  const { displayOff2, bordes } = Breakpoints();
  return (
    <Menu>
      <MenuButton
        fontSize={["sm"]}
        variant={"secondary"}
        as={Button}
        fontWeight={"normal"}
        color={color}
      >
        Historial
      </MenuButton>
      <Portal>
        <MenuList display={displayOff2} minWidth={0} border={bordes}>
          <MenuItem>
            <NavLink
              href={`/history/buy/[buy]`}
              as={`/history/buy/${a?.uid}`}
              name={"Historia de compra"}
              variant={"secondary"}
              fontWeight={"normal"}
            />
          </MenuItem>
          <MenuItem>
            <NavLink
              href={`/history/sale`}
              as={`/history/sale`}
              name={"Historia de venta"}
              variant={"secondary"}
              fontWeight={"normal"}
            />
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default MenuHistory;
