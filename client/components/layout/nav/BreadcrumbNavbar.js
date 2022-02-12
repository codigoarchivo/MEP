import React from "react";

import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import Breakpoints from "../../../helpers/Breakpoints";
export const BreadcrumbNavbar = ({ NavLink, Grid, GridItem, Button, Box }) => {
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
              <Button variant={"secondary"} as={"div"}>
                <NavLink href={"/"} name={"Home"} />
              </Button>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Button variant={"secondary"} as={"div"}>
                <NavLink href={"/"} name={"About"} q={"all"} />
              </Button>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Button variant={"secondary"} as={"div"}>
                <NavLink href={"/products"} name={"Shop All"} />
              </Button>
            </BreadcrumbItem>
          </Breadcrumb>
        </GridItem>
      </Grid>
    </Box>
  );
};
