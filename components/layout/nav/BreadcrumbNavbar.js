import React from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { chakra, Stack } from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import { serchProductList } from "../../../actions/product";

import MenuHistory from "../../../utils/MenuHistory";

import { dbProducts } from "../../../data/dbProducts";

export const BreadcrumbNavbar = ({ NavLink, Box, locale, es, en }) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { displayOff2, bordes, content5 } = Breakpoints();

  // handleObservator
  const handleObservator = async () => {
    const allData = await dbProducts("", "dbProOne");
    const err = locale === "en" ? en.error : es.error;
    if (allData.length > 0) {
      dispatch(serchProductList(allData, err));
    }
  };

  return (
    <Box display={displayOff2} mb={5} borderTop={bordes}>
      <chakra.nav boxShadow="md" backgroundColor={"brand.800"}>
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
              name={locale === "en" ? en.major.mA : es.major.mA}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <MenuHistory
              buys={locale === "en" ? en.major.mB : es.major.mB}
              sales={locale === "en" ? en.major.mC : es.major.mC}
              history={locale === "en" ? en.history : es.history}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <NavLink
              href={"/user"}
              as={"/user"}
              fontWeight={"normal"}
              variant={"secondary"}
              name={locale === "en" ? en.major.mD : es.major.mD}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <NavLink
              href={"/blog"}
              as={"/blog"}
              fontWeight={"normal"}
              variant={"secondary"}
              name={locale === "en" ? en.major.mE : es.major.mE}
            />
          </chakra.li>
          <chakra.li mx={"3"}>
            <NavLink
              fontWeight={"normal"}
              variant={"secondary"}
              href={`/product/[uid]`}
              as={`/product/${a?.uid}`}
              name={locale === "en" ? en.major.mG : es.major.mG}
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
                  name={locale === "en" ? en.major.mF : es.major.mF}
                />
              </chakra.li>
              <chakra.li mx={"3"}>
                <NavLink
                  fontWeight={"normal"}
                  variant={"secondary"}
                  href={"/admin"}
                  as={"/admin"}
                  name={locale === "en" ? en.major.mH : es.major.mH}
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
              name={locale === "en" ? en.major.mI : es.major.mI}
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
