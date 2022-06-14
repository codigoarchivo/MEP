import React from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { chakra, Stack } from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import { serchProductList } from "../../../actions/product";

import MenuHistory from "../../../utils/MenuHistory";

import { dbProducts } from "../../../data/dbProducts";

export const BreadcrumbNavbar = ({ NavLink, Box }) => {
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { displayOff2, bordes, content5 } = Breakpoints();

  // handleObservator
  const handleObservator = async () => {
    const allData = await dbProducts("", "dbProOne");
    if (allData.length > 0) {
      dispatch(serchProductList(allData));
    }
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
              as={"/"}
              name={"Home"}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <MenuHistory />
          </chakra.li>
          <chakra.li mx={"3"} onClick={handleObservator}>
            <NavLink
              href={"/user"}
              as={"/user"}
              fontWeight={"normal"}
              variant={"secondary"}
              name={"Editar Perfil"}
            />
          </chakra.li>
          <chakra.li mx={"3"} onClick={handleObservator}>
            <NavLink
              href={"/blog"}
              as={"/blog"}
              name={"Blog"}
              fontWeight={"normal"}
              variant={"secondary"}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={`/product/[uid]`}
              as={`/product/${a?.uid}`}
              name={"product"}
            />
          </chakra.li>

          {a?.rol === "owner" && (
            <chakra.li mx={"3"}>
              <NavLink
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/category"}
                as={"/category"}
                name={"category"}
              />
            </chakra.li>
          )}
          <chakra.li mx={"3"} onClick={handleObservator}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={"/search"}
              as={"/search"}
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
