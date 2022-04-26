import React from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { chakra, Stack } from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import { serchProductList } from "../../../actions/product";

export const BreadcrumbNavbar = ({ NavLink, Box, activeSelect }) => {
  // selector
  const { list } = useSelector(({ product }) => product);
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
              href={"/about"}
              name={"About"}
            />
          </chakra.li>
          {activeSelect?.rol === "owner" && (
            <chakra.li mx={"3"}>
              <NavLink
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/product"}
                name={"product"}
              />
            </chakra.li>
          )}
          {activeSelect?.rol === "owner" && (
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
  Grid: PropTypes.object.isRequired,
  GridItem: PropTypes.object.isRequired,
};
