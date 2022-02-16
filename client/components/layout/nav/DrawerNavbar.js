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
} from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

export const DrawerNavbar = ({
  onClose,
  isOpen,
  toggleColorMode,
  colorMode,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Link,
  Icon,
  SunIcon,
  MoonIcon,
}) => {
  // Breakpoints
  const { displayOn2 } = Breakpoints();
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
              <Menu>
                <MenuButton>Categoria</MenuButton>{" "}
                <Portal>
                  <MenuList zIndex={"modal"}>
                    <MenuItem>
                      <Link>Chakra UI</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link>Chakra UI</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link>Chakra UI</Link>
                    </MenuItem>
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
  Portal: PropTypes.func.isRequired,
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
