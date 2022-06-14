import React, { useContext } from "react";

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
  Button,
  HStack,
  Heading,
  Select,
} from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import NavLink from "../../../utils/Navlink";

import { useDispatch, useSelector } from "react-redux";
import { serchProductList } from "../../../actions/product";

import {
  Category,
  Home,
  Product,
  ShopAll,
  CategoryAll,
  Perfil,
  Global,
  Logout,
  VentaIcon,
} from "../../../helpers/IconNew";

import { UIContext } from "../../../context/UIContext";

export const DrawerNavbar = ({
  onClose,
  isOpen,
  toggleColorMode,
  colorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  SunIcon,
  MoonIcon,
  handleLogout,
}) => {
  // useContext
  const a = useContext(UIContext);
  // Breakpoints
  const { displayOn2, bordes } = Breakpoints();
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
            <Menu>
              <MenuButton
                leftIcon={<CategoryAll />}
                variant={"primary"}
                as={Button}
                textTransform={"uppercase"}
                w={"full"}
              >
                Todas Categorias
              </MenuButton>
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
                        leftIcon={<VentaIcon />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/user/selling"}
                        name={"Quieres vender"}
                      />
                    </chakra.li>
                    {a?.rol === "owner" && (
                      <chakra.li mx={"3"}>
                        <NavLink
                          leftIcon={<Product />}
                          fontWeight={"normal"}
                          variant={"secondary"}
                          href={`/product/[uid]`}
                          as={`/product/${a?.uid}`}
                          name={"product"}
                        />
                      </chakra.li>
                    )}
                    {a?.rol === "owner" && (
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
                        leftIcon={<ShopAll />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/search"}
                        name={"Shop All"}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <NavLink
                        leftIcon={<ShopAll />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/blog"}
                        name={"Blog"}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <NavLink
                        leftIcon={<Perfil />}
                        href={"/user"}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        name={"Editar Perfil"}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <Button
                        variant={"secondary"}
                        fontWeight={"normal"}
                        leftIcon={<Logout />}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <HStack w={"full"} alignItems={"stretch"}>
                        <Box w={6} h={6} as={Global} />

                        <Heading textTransform={"uppercase"} size="sm">
                          Idioma
                        </Heading>

                        <Select placeholder="English" size="sx" fontSize={"sm"}>
                          <option value="option1">Español</option>
                        </Select>
                      </HStack>
                    </chakra.li>
                  </Stack>
                </chakra.nav>
              </Box>
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
