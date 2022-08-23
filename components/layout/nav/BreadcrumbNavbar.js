import React from "react";

import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { chakra, Stack, useBreakpointValue } from "@chakra-ui/react";

import { Breakpoints } from "../../../helpers/Breakpoints";

import { MenuHistory } from "../../../utils/MenuHistory";

import { ListRoute } from "./ListRoute";

import { ModeColor } from "../../../helpers/ModeColor";

export const BreadcrumbNavbar = ({ NavLink, Box, locale, es, en }) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // Breakpoints
  const { displayOff2, bordes, content5 } = Breakpoints();
  // ListRoute
  const { dataRoute } = ListRoute();
  // useBreakpointValue
  const valSpace = useBreakpointValue({ base: "6px", lg: "16px" });

  const { modelA } = ModeColor()

  return (
    <Box display={displayOff2} mb={5} borderTop={bordes}>
      <chakra.nav boxShadow="md" backgroundColor={modelA}>
        <Stack
          spacing={0}
          as={"ul"}
          flexDirection={content5}
          justifyContent={"center"}
          alignItems={"center"}
          py={2}
        >
          {dataRoute.map(({ icon, ref, as, nam, rol }, key) => (
            <chakra.li key={key} display={rol && rol}>
              <NavLink
                leftIcon={icon}
                fontWeight={"normal"}
                variant={"secondary"}
                href={ref}
                as={as}
                name={nam}
                px={`${valSpace}`}
              />
            </chakra.li>
          ))}

          <chakra.li
            display={a.rol === "owner" || a.rol === "user" ? "block" : "none"}
          >
            <MenuHistory
              buys={locale === "en-US" ? en.major.mB : es.major.mB}
              sales={locale === "en-US" ? en.major.mC : es.major.mC}
              history={locale === "en-US" ? en.history : es.history}
              valSpace={valSpace}
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
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
