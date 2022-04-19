import React from "react";

import PropTypes from "prop-types";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Portal,
  Stack,
  chakra,
  Box,
} from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import NavLink from "../../../helpers/Navlink";

import { useDispatch, useSelector } from "react-redux";
import { serchProductList } from "../../../actions/product";
import { About, Category, Home, Product } from "../../../helpers/IconNew";

export const DrawerNavbar = ({
  onClose,
  isOpen,
  toggleColorMode,
  colorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  Icon,
  SunIcon,
  MoonIcon,
}) => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // Breakpoints
  const { displayOn2, bordes, content5 } = Breakpoints();
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ category }) => category);
  // handleObservator
  const handleObservator = () => {
    dispatch(serchProductList(list));
  };
  return (
    <>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader
            borderBottomWidth="1px"
            justifyContent={"space-evenly"}
            display="flex"
            alignItems={"center"}
          >
            Basic Drawer
            <Icon
              display={displayOn2}
              boxSize={6}
              cursor={"pointer"}
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Icon>
          </DrawerHeader>

          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Box mb={5}>
                <chakra.nav>
                  <Stack
                    spacing={5}
                    as={"ul"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    py={2}
                  >
                    <chakra.li>
                      <NavLink
                        leftIcon={<Home />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/"}
                        name={"Home"}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"}>
                      <NavLink
                        leftIcon={<About />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/about"}
                        name={"About"}
                      />
                    </chakra.li>
                    {activeSelect.rol === "owner" && (
                      <chakra.li mx={"3"}>
                        <NavLink
                          leftIcon={<Product />}
                          fontWeight={"normal"}
                          variant={"secondary"}
                          href={"/product"}
                          name={"product"}
                        />
                      </chakra.li>
                    )}
                    {activeSelect.rol === "owner" && (
                      <chakra.li mx={"3"}>
                        <NavLink
                          leftIcon={<Category />}
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
              <Menu>
                <MenuButton>Categoria</MenuButton>{" "}
                <Portal>
                  <MenuList zIndex={"modal"} border={bordes}>
                    {list.map(({ na, id }) => (
                      <MenuItem key={id}>
                        <NavLink
                          href={{
                            pathname: "/search",
                            query: { c: id, n: na },
                          }}
                          name={na}
                          variant={"secondary"}
                          fontWeight={"normal"}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </Portal>
              </Menu>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

DrawerNavbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  Menu: PropTypes.func.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  colorMode: PropTypes.string.isRequired,
  MenuButton: PropTypes.object.isRequired,
  MenuList: PropTypes.object.isRequired,
  MenuItem: PropTypes.object.isRequired,
  Link: PropTypes.object.isRequired,
  Icon: PropTypes.object.isRequired,
  SunIcon: PropTypes.object.isRequired,
  MoonIcon: PropTypes.object.isRequired,
};
