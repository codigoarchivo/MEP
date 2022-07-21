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
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";

import {
  CartIcon,
  LoveIcon,
  OrdenpagoIcon,
  ShopAll,
} from "../../../helpers/IconNew";

import { useModality } from "../../../hooks/useModality";

import { Breakpoints } from "../../../helpers/Breakpoints";
import { Toast } from "../../../helpers/Toast";

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
  const {
    activeCartSelect = [],
    activeSelectCheck: check = [],
    saveCartSelect = [],
  } = useSelector(({ process }) => process);
  // useDisclosure
  const { isOpen, onToggle } = useDisclosure();
  // Breakpoints
  const { points11, bordes, displayOff2, displayOn2 } = Breakpoints();
  // Modality
  const { modality, setModality } = useModality();
  // dispatch
  const { locale, push, pathname } = useRouter();

  const { dataRoute } = ListRoute();

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        mb={{ base: 5, md: 0 }}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
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
            variant={"ghost"}
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
              InputLeftElement={InputLeftElement}
              Input={Input}
              SearchIcon={SearchIcon}
              serch={locale === "en" ? en.searchs : es.searchs}
            />
          </Box>

          <Box
            display={displayOff2}
            position={"relative"}
            alignItems={"center"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
          >
            <Image
              src={"/img/logo.png"}
              alt="Picture of the author"
              width={130}
              height={100}
              priority={true}
            />
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={{ base: 0, lg: 10 }}>
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
            <Box position={"relative"}>
              <NavLink
                px={0}
                fontWeight={400}
                variant={"secodary"}
                onClick={() =>
                  check.length > 0 &&
                  (Toast(locale === "en" ? en.you : es.you, "info", 5000),
                  push("/"))
                }
                href={pathname !== "/cart" ? "/cart" : "/search"}
                name={
                  pathname !== "/cart" ? (
                    <CartIcon boxSize={{ base: 6, sm: 7 }} />
                  ) : (
                    <ShopAll boxSize={{ base: 6, sm: 7 }} />
                  )
                }
              />
              <Flex
                right={{ base: 0, sm: -2 }}
                top={0}
                zIndex={-10}
                border={bordes}
                alignItems={"center"}
                justifyContent="center"
                backgroundColor={"brand.800"}
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
                variant={"secondary"}
                position={"relative"}
                px={0}
                cursor={"pointer"}
                minW={0}
                onClick={() =>
                  check.length > 0 &&
                  (Toast(locale === "en" ? en.you : es.you, "info", 5000),
                  push("/"))
                }
              >
                <CartIcon boxSize={points11} />
                <Flex
                  right={{ base: -3, sm: -4 }}
                  top={0}
                  zIndex={-10}
                  border={bordes}
                  alignItems={"center"}
                  justifyContent="center"
                  backgroundColor={"brand.800"}
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

              <MenuList zIndex={10}>
                <NavbarCart />
              </MenuList>
            </Menu>
          </Flex>

          <Box position={"relative"}>
            <NavLink
              px={0}
              fontWeight={400}
              variant={"secondary"}
              href={a.uid ? `/checkout?q=${a.uid}` : "/auth"}
              name={
                a.uid ? (
                  <OrdenpagoIcon boxSize={{ base: 6, sm: 7 }} />
                ) : locale === "en" ? (
                  en.auth.aB
                ) : (
                  es.auth.aB
                )
              }
            />

            <Box
              display={a.uid ? "block" : "none"}
              right={{ base: -1, sm: -2 }}
              zIndex={-10}
              top={0}
              border={bordes}
              textAlign={"center"}
              backgroundColor={"brand.800"}
              borderRadius={"full"}
              position={"absolute"}
              w={{ base: 4, sm: 5 }}
              h={{ base: 4, sm: 5 }}
              fontWeight={"bold"}
              fontSize={{ base: "x-small", sm: "smaller" }}
            >
              {check.length > 0 ? check.length : 0}
            </Box>
          </Box>

          <Box position={"relative"}>
            <NavLink
              px={0}
              variant={"secondary"}
              href={a.uid ? "/cart" : "/auth/create"}
              name={
                a.uid ? (
                  <LoveIcon boxSize={{ base: 6, sm: 7 }} />
                ) : locale === "en" ? (
                  en.auth.aH
                ) : (
                  es.auth.aH
                )
              }
            />
            <Box
              display={a.uid ? "block" : "none"}
              right={{ base: -1, sm: -3 }}
              zIndex={-10}
              top={0}
              border={bordes}
              textAlign={"center"}
              backgroundColor={"brand.800"}
              borderRadius={"full"}
              position={"absolute"}
              w={{ base: 4, sm: 5 }}
              h={{ base: 4, sm: 5 }}
              fontWeight={"bold"}
              fontSize={{ base: "x-small", sm: "smaller" }}
            >
              {!saveCartSelect[0] ? 0 : saveCartSelect.length}
            </Box>
          </Box>

          <Flex alignItems={"center"} display={displayOff2}>
            <MenuNavButton />
          </Flex>
        </Stack>
      </Flex>
      {/* Collapse */}
      <Collapse in={isOpen} animateOpacity>
        <Stack p={4} display={{ md: "none" }}>
          {dataRoute.map(({ icon, ref, as, nam, rol }, key) => (
            <Box key={key} display={rol && rol}>
              <NavLink
                leftIcon={icon}
                fontWeight={"normal"}
                variant={"secondary"}
                href={ref}
                as={as}
                name={nam}
              />
            </Box>
          ))}
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
