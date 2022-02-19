import React from "react";

import PropTypes from "prop-types";

import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import Breakpoints from "../../../helpers/Breakpoints";

export const BreadcrumbNavbar = ({ NavLink, Grid, GridItem, Box }) => {
  // Breakpoints
  const { displayOff2 } = Breakpoints();

  return (
    <Box display={displayOff2}>
      <Grid
        gridTemplateColumns={"repeat(1, 1fr)"}
        alignItems={"center"}
        justifyItems="center"
        py={5}
      >
        <GridItem colSpan={1} mx={5}>
          <Breadcrumb
            spacing="10px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <NavLink variant={"secondary"} href={"/"} name={"Home"} />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NavLink variant={"secondary"} href={"/"} name={"About"} />
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <NavLink
                variant={"secondary"}
                href={"/search"}
                name={"Shop All"}
              />
            </BreadcrumbItem>
          </Breadcrumb>
        </GridItem>
      </Grid>
    </Box>
  );
};

BreadcrumbNavbar.propTypes = {
  NavLink: PropTypes.func.isRequired,
  Grid: PropTypes.object.isRequired,
  GridItem: PropTypes.object.isRequired,
};
