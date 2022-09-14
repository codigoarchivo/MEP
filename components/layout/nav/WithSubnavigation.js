import React from "react";

import Image from "next/image";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  InputGroup,
  InputRightElement,
  Input,
  Text,
  HStack,
  Heading,
  useColorMode,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";

import {
  CartIcon,
  LoveIcon,
  OrdenpagoIcon,
  ShopAll,
} from "../../../helpers/IconNew";

import { useModality } from "../../../hooks/useModality";

import { Breakpoints } from "../../../helpers/Breakpoints";
import { Toast } from "../../../helpers/Toast";
import { ModeColor } from "../../../helpers/ModeColor";

import { NavLink } from "../../../utils/Navlink";

import { NavbarCart } from "./NavbarCart";
import { ListRoute } from "./ListRoute";
import { DialogSerchNavbar } from "./DialogSerchNavbar";
import { BreadcrumbNavbar } from "./BreadcrumbNavbar";
import { DesktopNav } from "./DesktopNav";
import { MenuNavButton } from "./MenuNavButton";
import { LogoutAllClear } from "./LogoutAllClear";
import { NavbarLocal } from "./NavbarLocal";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export function WithSubnavigation() {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { activeSelectCheck: check = [] } = useSelector(
    ({ process }) => process
  );
  // selector
  const { saveCartSelect = [] } = useSelector(({ save }) => save);
  // selector
  const { activeCartSelect = [] } = useSelector(({ cart }) => cart);
  // useDisclosure
  const { isOpen, onToggle } = useDisclosure();
  // Breakpoints
  const { points11, bordes, displayOff2, displayOn2 } = Breakpoints();
  // Modality
  const { modality, setModality } = useModality();
  // dispatch
  const { locale, pathname } = useRouter();

  const { dataRoute } = ListRoute();

  const { modelC, modelD } = ModeColor();

  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box>
      <Flex
        mb={{ base: 5, md: 0 }}
        py={{ base: 3 }}
        px={{ base: 3, md: 5, lg: 10 }}
        borderBottom={1}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"tertiary"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Box display={displayOn2}>
            <DialogSerchNavbar
              setModality={setModality}
              displayOn2={displayOn2}
              isSerch={modality}
              setIsSerch={setModality}
              InputGroup={InputGroup}
              InputRightElement={InputRightElement}
              Input={Input}
              SearchIcon={SearchIcon}
              serch={locale === "en-US" ? en.searchs : es.searchs}
            />
          </Box>

          <Box display={displayOff2} w={100} h={100} position={"relative"}>
            <Image
              src={
                colorMode === "dark"
                  ? "/img/logo-dark.png"
                  : "/img/logo-light.png"
              }
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={{ base: 0, md: 5 }}>
            {/* Category */}
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          justifyContent={"space-around"}
          direction={"row"}
          spacing={6}
          alignItems={"center"}
          ml={{ base: 0, sm: 3 }}
        >
          <Flex alignItems={"center"} display={displayOn2}>
            <Box
              position={"relative"}
              onClick={() =>
                check.length > 0 &&
                Toast(locale === "en-US" ? en.you : es.you, "info", 5000)
              }
            >
              <NavLink
                px={0}
                fontWeight={400}
                variant={"tertiary"}
                href={
                  pathname !== "/cart"
                    ? check.length > 0
                      ? "/search"
                      : "/cart"
                    : "/search"
                }
                name={
                  pathname !== "/cart" ? (
                    <CartIcon boxSize={{ base: 6, sm: 7 }} />
                  ) : (
                    <ShopAll boxSize={{ base: 6, sm: 7 }} />
                  )
                }
              />
              <Flex
                backgroundColor={modelC}
                color={modelD}
                right={{ base: 0, sm: -2 }}
                top={0}
                zIndex={-10}
                border={bordes}
                alignItems={"center"}
                justifyContent="center"
                borderRadius={"full"}
                position={"absolute"}
                w={{ base: 4, sm: 5 }}
                h={{ base: 4, sm: 5 }}
                fontWeight={"bold"}
                fontSize={{ base: "x-small", sm: "smaller" }}
              >
                {!activeCartSelect[0] ? 0 : activeCartSelect.length}
              </Flex>
            </Box>
          </Flex>
          <Flex alignItems={"center"} display={displayOff2}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"tertiary"}
                position={"relative"}
                px={0}
                cursor={"pointer"}
                minW={0}
                onClick={() =>
                  check.length > 0 &&
                  Toast(locale === "en-US" ? en.you : es.you, "info", 5000)
                }
              >
                <CartIcon boxSize={points11} />
                <Flex
                  backgroundColor={modelC}
                  color={modelD}
                  right={{ base: -3, sm: -4 }}
                  top={0}
                  zIndex={-10}
                  border={bordes}
                  alignItems={"center"}
                  justifyContent="center"
                  borderRadius={"full"}
                  position={"absolute"}
                  w={{ base: 4, sm: 5 }}
                  h={{ base: 4, sm: 5 }}
                  fontWeight={"bold"}
                  fontSize={{ base: "x-small", sm: "smaller" }}
                >
                  {!activeCartSelect[0] ? 0 : activeCartSelect.length}
                </Flex>
              </MenuButton>

              <MenuList
                zIndex={1000}
                display={check.length > 0 ? "none" : "block"}
              >
                <NavbarCart />
              </MenuList>
            </Menu>
          </Flex>

          <Box position={"relative"}>
            <NavLink
              fontSize={{ base: "xs", md: "1rem" }}
              px={0}
              variant={"tertiary"}
              href={a.uid ? `/checkout?q=${a.uid}` : "/auth"}
              name={
                a.uid ? (
                  <OrdenpagoIcon boxSize={{ base: 6, sm: 7 }} />
                ) : locale === "en-US" ? (
                  en.auth.aB
                ) : (
                  es.auth.aB
                )
              }
            />

            <Text
              backgroundColor={modelC}
              color={modelD}
              display={a.uid ? "block" : "none"}
              right={{ base: -1, sm: -2 }}
              zIndex={-10}
              top={0}
              border={bordes}
              textAlign={"center"}
              borderRadius={"full"}
              position={"absolute"}
              w={{ base: 4, sm: 5 }}
              h={{ base: 4, sm: 5 }}
              fontWeight={"bold"}
              fontSize={{ base: "x-small", sm: "smaller" }}
            >
              {check.length > 0 ? check.length : 0}
            </Text>
          </Box>

          <Box position={"relative"}>
            <NavLink
              px={0}
              fontSize={{ base: "xs", md: "1rem" }}
              variant={"tertiary"}
              href={a.uid ? "/cart" : "/auth/create"}
              name={
                a.uid ? (
                  <LoveIcon boxSize={{ base: 6, sm: 7 }} />
                ) : locale === "en-US" ? (
                  en.auth.aH
                ) : (
                  es.auth.aH
                )
              }
            />
            <Text
              backgroundColor={modelC}
              color={modelD}
              display={a.uid ? "block" : "none"}
              right={{ base: -1, sm: -3 }}
              zIndex={-10}
              top={0}
              border={bordes}
              textAlign={"center"}
              borderRadius={"full"}
              position={"absolute"}
              w={{ base: 4, sm: 5 }}
              h={{ base: 4, sm: 5 }}
              fontWeight={"bold"}
              fontSize={{ base: "x-small", sm: "smaller" }}
            >
              {!saveCartSelect[0] ? 0 : saveCartSelect.length}
            </Text>
          </Box>

          <Flex alignItems={"center"} display={displayOff2}>
            <MenuNavButton />
          </Flex>
        </Stack>
      </Flex>
      {/* Collapse */}
      <Collapse in={isOpen} animateOpacity>
        <HStack justifyContent={"space-between"} w={"full"} p={4}>
          <Heading size={"md"}>{a?.displayName}</Heading>
          <Button
            onClick={toggleColorMode}
            size="xs"
            px={0}
            variant={"tertiary"}
          >
            {colorMode === "light" ? (
              <MoonIcon boxSize={6} />
            ) : (
              <SunIcon boxSize={6} />
            )}
          </Button>
        </HStack>
        <Stack p={4} m={1} display={{ md: "none" }} border={bordes}>
          {dataRoute.map(({ icon, ref, as, nam, rol }, key) => (
            <Box key={key} display={rol && rol}>
              <NavLink
                leftIcon={icon}
                fontWeight={"normal"}
                variant={"tertiary"}
                href={ref}
                as={as}
                name={nam}
              />
            </Box>
          ))}
          <Box
            display={a.rol === "owner" || a.rol === "user" ? "block" : "none"}
          >
            <NavLink
              href={a.uid ? `/purchases/[uid]` : "/"}
              as={a.uid ? `/purchases/${a?.uid}` : "/"}
              name={"buys"}
              variant={"tertiary"}
              fontWeight={"normal"}
            />
          </Box>
          <Box
            display={a.rol === "owner" || a.rol === "user" ? "block" : "none"}
          >
            <NavLink
              href={a.uid ? `/sale/[uid]` : "/"}
              as={a.uid ? `/sale/${a?.uid}` : "/"}
              name={"sales"}
              variant={"tertiary"}
              fontWeight={"normal"}
            />
          </Box>
          {/* logout Clear */}
          <LogoutAllClear />
          {/* locales */}
          <NavbarLocal />
        </Stack>
      </Collapse>
      {/* BreadcrumbNavbar */}
      <BreadcrumbNavbar
        NavLink={NavLink}
        Box={Box}
        locale={locale}
        es={es}
        en={en}
      />
    </Box>
  );
}
