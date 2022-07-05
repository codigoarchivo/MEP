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
  Button,
  HStack,
  Heading,
} from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import NavLink from "../../../utils/Navlink";

import { useSelector } from "react-redux";

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
  es,
  en,
  locale,
  locales,
  asPath,
}) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // Breakpoints
  const { displayOn2, bordes } = Breakpoints();
  // selector
  const { listData = [] } = useSelector(({ category }) => category);

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
                {locale === "en" ? en.categories : es.categories}
              </MenuButton>
              <Portal>
                <MenuList zIndex={"modal"} border={bordes}>
                  {listData.map(({ na, id }) => (
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
                        px={0}
                        leftIcon={<Home />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/"}
                        name={locale === "en" ? en.major.mA : es.major.mA}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"}>
                      <NavLink
                        px={0}
                        leftIcon={<Perfil />}
                        href={"/user"}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        name={locale === "en" ? en.major.mD : es.major.mD}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"}>
                      <NavLink
                        px={0}
                        leftIcon={<ListEspera />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/blog"}
                        name={locale === "en" ? en.major.mE : es.major.mE}
                      />
                    </chakra.li>

                    {a?.rol === "owner" && (
                      <>
                        <chakra.li mx={"3"}>
                          <NavLink
                            px={0}
                            leftIcon={<Category />}
                            fontWeight={"normal"}
                            variant={"secondary"}
                            href={"/admin/category"}
                            name={locale === "en" ? en.major.mF : es.major.mF}
                          />
                        </chakra.li>
                        <chakra.li mx={"3"}>
                          <NavLink
                            px={0}
                            leftIcon={<VentasClient />}
                            fontWeight={"normal"}
                            variant={"secondary"}
                            href={"/admin"}
                            name={locale === "en" ? en.major.mH : es.major.mH}
                          />
                        </chakra.li>
                      </>
                    )}

                    <chakra.li mx={"3"}>
                      <NavLink
                        px={0}
                        leftIcon={<Product />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={`/product/[uid]`}
                        as={`/product/${a?.uid}`}
                        name={locale === "en" ? en.major.mG : es.major.mG}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"}>
                      <NavLink
                        px={0}
                        leftIcon={<ShopAll />}
                        fontWeight={"normal"}
                        variant={"secondary"}
                        href={"/search"}
                        name={locale === "en" ? en.major.mI : es.major.mI}
                      />
                    </chakra.li>
                    <chakra.li mx={"3"}>
                      <Button
                        px={0}
                        variant={"secondary"}
                        fontWeight={"normal"}
                        leftIcon={<Logout />}
                        onClick={handleLogout}
                      >
                        {locale === "en" ? en.logout : es.logout}
                      </Button>
                    </chakra.li>

                    <HStack w={"full"} alignItems={"center"}>
                      <Heading textTransform={"uppercase"} size="sm">
                        <Box w={6} h={6} as={Global} />{" "}
                        {locale === "en" ? en.language : es.language}
                      </Heading>
                      {locales.map((lo, i) => (
                        <chakra.li key={i} sx={{ listStyle: "none" }}>
                          <NavLink
                            size={"sm"}
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
