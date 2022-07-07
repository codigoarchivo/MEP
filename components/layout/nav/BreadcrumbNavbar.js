import React from "react";

import PropTypes from "prop-types";

import { chakra, Stack } from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import MenuHistory from "../../../utils/MenuHistory";

import ListRoute from "./ListRoute";

export const BreadcrumbNavbar = ({ NavLink, Box, locale, es, en }) => {
  // Breakpoints
  const { displayOff2, bordes, content5 } = Breakpoints();

  const { dataRoute } = ListRoute();
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
          {dataRoute.map(({ icon, ref, as, nam, rol }, key) => (
            <chakra.li mx={"3"} key={key} display={rol && rol}>
              <NavLink
                leftIcon={icon}
                fontWeight={"normal"}
                variant={"secondary"}
                href={ref}
                as={as}
                name={nam}
                px={"10px"}
              />
            </chakra.li>
          ))}

          <chakra.li mx={"3"}>
            <MenuHistory
              buys={locale === "en" ? en.major.mB : es.major.mB}
              sales={locale === "en" ? en.major.mC : es.major.mC}
              history={locale === "en" ? en.history : es.history}
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
