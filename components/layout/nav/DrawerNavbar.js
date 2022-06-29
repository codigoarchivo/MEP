import React, { useEffect } from "react";

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
} from "@chakra-ui/react";

import { useRouter } from "next/router";

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
  VentasClient,
  ListEspera,
} from "../../../helpers/IconNew";
import { listTraslate } from "../../../actions/translate";

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
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { t } = useSelector(({ translate }) => translate);
  // Breakpoints
  const { displayOn2, bordes } = Breakpoints();
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list = [] } = useSelector(({ category }) => category);
  // useRouter
  const { locale, locales, asPath } = useRouter();

  // translate
  const data = `/translations/${locale}/global.json`;
  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then((t) => dispatch(listTraslate(t)));
  }, [dispatch, data]);

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
            {a?.displayName}
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
                {t.categories}
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
                        name={t.major.mA}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <NavLink
                        leftIcon={<Perfil />}
                        href={"/user"}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        name={t.major.mD}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <NavLink
                        leftIcon={<ListEspera />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/blog"}
                        name={t.major.mE}
                      />
                    </chakra.li>

                    {a?.rol === "owner" && (
                      <>
                        <chakra.li mx={"3"}>
                          <NavLink
                            leftIcon={<Category />}
                            fontWeight={"normal"}
                            variant={"secondary"}
                            href={"/admin/category"}
                            name={t.major.mF}
                          />
                        </chakra.li>
                        <chakra.li mx={"3"}>
                          <NavLink
                            leftIcon={<VentasClient />}
                            fontWeight={"normal"}
                            variant={"secondary"}
                            href={"/admin"}
                            name={t.major.mH}
                          />
                        </chakra.li>
                      </>
                    )}

                    <chakra.li mx={"3"}>
                      <NavLink
                        leftIcon={<Product />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={`/product/[uid]`}
                        as={`/product/${a?.uid}`}
                        name={t.major.mG}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <NavLink
                        leftIcon={<ShopAll />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/search"}
                        name={t.major.mI}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <Button
                        variant={"secondary"}
                        fontWeight={"normal"}
                        leftIcon={<Logout />}
                        onClick={handleLogout}
                      >
                        {t.Logout}
                      </Button>
                    </chakra.li>
                    <chakra.li mx={"3"} onClick={handleObservator}>
                      <HStack w={"full"} alignItems={"center"}>
                        <Box w={6} h={6} as={Global} />

                        <Heading textTransform={"uppercase"} size="sm">
                          Idioma
                        </Heading>

                        {locales.map((lo, i) => (
                          <chakra.li key={i} sx={{ listStyle: "none" }}>
                            <NavLink
                              variant={"primary"}
                              href={asPath}
                              locale={lo}
                              name={lo}
                              px={0}
                              w={0}
                            />
                          </chakra.li>
                        ))}
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
