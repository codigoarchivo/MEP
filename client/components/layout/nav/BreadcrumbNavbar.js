import React from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import {
  Button,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
} from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import { serchProductList } from "../../../actions/product";
import { CategoryAll } from "../../../helpers/IconNew";

export const BreadcrumbNavbar = ({ NavLink, Box }) => {
  // dispatch
  const router = useRouter();
  // selector
  const { list } = useSelector(({ product }) => product);
  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { displayOff2, bordes, content5 } = Breakpoints();

  // handleObservator
  const handleObservator = () => {
    dispatch(serchProductList(list));
  };
  return (
    <Box display={displayOff2} mb={5} borderTop={bordes}>
      <chakra.nav boxShadow="md">
        <Stack
          spacing={0}
          as={"ul"}
          flexDirection={content5}
          justifyContent={"center"}
          alignItems={"center"}
          py={2}
        >
          <chakra.li mx={"3"}>
            <Menu>
              <MenuButton
                fontSize={["sm"]}
                variant={"secondary"}
                as={Button}
                fontWeight={"normal"}
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
                      href={`/history/sale/[sale]`}
                      as={`/history/sale/${a?.uid}`}
                      name={"Historia de venta"}
                      variant={"secondary"}
                      fontWeight={"normal"}
                    />
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </chakra.li>
          <chakra.li mx={"3"}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={"/"}
              name={"Home"}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={"/search/concerning"}
              name={"About"}
            />
          </chakra.li>
          {a?.rol === "owner" && (
            <chakra.li mx={"3"}>
              <NavLink
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/product/list"}
                name={"product"}
              />
            </chakra.li>
          )}
          {a?.rol === "owner" && (
            <chakra.li mx={"3"}>
              <NavLink
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/category"}
                name={"category"}
              />
            </chakra.li>
          )}
          <chakra.li mx={"3"} onClick={handleObservator}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={"/search"}
              name={"Shop All"}
            />
          </chakra.li>
        </Stack>
      </chakra.nav>
    </Box>
  );
};

BreadcrumbNavbar.propTypes = {
  NavLink: PropTypes.func.isRequired,
  Box: PropTypes.object.isRequired,
};
