import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";

export const DrawerNavbar = ({
  onClose,
  isOpen,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Link,
  Icon,
  SunIcon,
  MoonIcon,
  toggleColorMode,
  colorMode,
}) => {
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
            <Icon boxSize={6} cursor={"pointer"} onClick={toggleColorMode}>
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
