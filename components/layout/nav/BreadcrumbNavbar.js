import React from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { chakra, Stack } from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import { serchProductList } from "../../../actions/product";

import MenuHistory from "../../../utils/MenuHistory";

import { dbProducts } from "../../../data/dbProducts";

export const BreadcrumbNavbar = ({ NavLink, Box }) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { t } = useSelector(({ translate }) => translate);
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
              name={t.major.mA}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <MenuHistory
              buys={t.major.mB}
              sales={t.major.mC}
              history={t.history}
            />
          </chakra.li>
          <chakra.li mx={"3"} onClick={handleObservator}>
            <NavLink
              href={"/user"}
              as={"/user"}
              fontWeight={"normal"}
              variant={"secondary"}
              name={t.major.mD}
            />
          </chakra.li>
          <chakra.li mx={"3"} onClick={handleObservator}>
            <NavLink
              href={"/blog"}
              as={"/blog"}
              fontWeight={"normal"}
              variant={"secondary"}
              name={t.major.mE}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={`/product/[uid]`}
              as={`/product/${a?.uid}`}
              name={t.major.mG}
            />
          </chakra.li>

          {a?.rol === "owner" && (
            <>
              <chakra.li mx={"3"}>
                <NavLink
                  fontWeight={"normal"}
                  variant={"secondary"}
                  href={"/admin/category"}
                  as={"/admin/category"}
                  name={t.major.mF}
                />
              </chakra.li>
              <chakra.li mx={"3"}>
                <NavLink
                  fontWeight={"normal"}
                  variant={"secondary"}
                  href={"/admin"}
                  as={"/admin"}
                  name={t.major.mH}
                />
              </chakra.li>
            </>
          )}
          <chakra.li mx={"3"} onClick={handleObservator}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={"/search"}
              as={"/search"}
              name={t.major.mI}
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
