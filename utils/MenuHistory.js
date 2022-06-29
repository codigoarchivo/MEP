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

import Breakpoints from "../helpers/Breakpoints";

const MenuHistory = ({ color, buys, sales, history }) => {
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
        {history}
      </MenuButton>
      <Portal>
        <MenuList display={displayOff2} minWidth={0} border={bordes}>
          <MenuItem>
            <NavLink
              href={`/buy?u=${a?.uid}`}
              as={`/buy?u=${a?.uid}`}
              name={buys}
              variant={"secondary"}
              fontWeight={"normal"}
            />
          </MenuItem>
          <MenuItem>
            <NavLink
              href={`/sale?u=${a?.uid}`}
              as={`/sale?u=${a?.uid}`}
              name={sales}
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
