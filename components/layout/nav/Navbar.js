import React from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";

import { CartIcon, LoveIcon, OrdenpagoIcon } from "../../../helpers/IconNew";
import ModeColor from "../../../helpers/ModeColor";
import Breakpoints from "../../../helpers/Breakpoints";
import NavLink from "../../../utils/Navlink";

import { DrawerNavbar } from "./DrawerNavbar";
import { DialogSerchNavbar } from "./DialogSerchNavbar";
import { BreadcrumbNavbar } from "./BreadcrumbNavbar";
import PopoverUserNavbar from "./PopoverUserNavbar";

import { useModality } from "../../../hooks/useModality";

import NavbarCart from "./NavbarCart";

import { logout } from "../../../actions/auth";

import useFormAll from "../../../hooks/useFormAll";

import Toast from "../../../helpers/Toast";
import MenuCategoria from "../../../utils/MenuCategoria";

import en from "../../../translations/en";
import es from "../../../translations/es";

const initialStates = {
  q: "",
};
const Navbar = () => {
  // dispatch
  const dispatch = useDispatch();
  // dispatch
  const { push, locale, locales, asPath } = useRouter();
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const {
    activeCartSelect = [],
    activeSelectCheck: check = [],
    saveCartSelect = [],
  } = useSelector(({ process }) => process);

  // Modality
  const { modality, setModality } = useModality();
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();
  // drawer
  const { isOpen, onClose, onOpen } = useDisclosure();
  // mode Color
  const { bg2 } = ModeColor();
  // Breakpoints
  const {
    displayOn2,
    displayOff2,
    points5,
    points11,
    points15,
    repeat4,
    porcent2,
    bordes,
    points14,
  } = Breakpoints();

  const handleLogout = () => {
    const err = locale === "en" ? en.error : es.error;
    dispatch(logout(err));

    if (logout) {
      push("/");
    }
  };

  const { values, reset, handleInputChange } = useFormAll(initialStates);

  const handleSerchProduct = (e) => {
    e.preventDefault();
    const q = values.q;
    push({
      pathname: "/search",
      query: { q },
    });
    reset();
  };

  const handleSerchProductCart = (data) => {
    return Toast(data, "info", 5000);
  };

  return (
    <>
      {/* DrawerNavbar */}
      <DrawerNavbar
        isOpen={isOpen}
        onClose={onClose}
        Menu={Menu}
        MenuButton={MenuButton}
        MenuList={MenuList}
        MenuItem={MenuItem}
        Link={Link}
        Icon={Icon}
        SunIcon={SunIcon}
        MoonIcon={MoonIcon}
        toggleColorMode={toggleColorMode}
        colorMode={colorMode}
        handleLogout={handleLogout}
        es={es}
        en={en}
        locale={locale}
        locales={locales}
        asPath={asPath}
      />
      {/* DialogSerchNavbar */}
      <DialogSerchNavbar
        isSerch={modality}
        setIsSerch={setModality}
        InputGroup={InputGroup}
        InputLeftElement={InputLeftElement}
        Input={Input}
        SearchIcon={SearchIcon}
        serch={locale === "en" ? en.searchs : es.searchs}
      />

      <Flex
        as={"nav"}
        direction={"row"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        borderStyle={"solid"}
        minWidth={"100%"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={displayOn2}
        >
          <Icon
            boxSize={6}
            mx={{ base: 3, sm: 7 }}
            cursor={"pointer"}
            onClick={onOpen}
          >
            <HamburgerIcon />
          </Icon>
        </Flex>
        <Flex display={displayOff2}>
          <Box position={"relative"} alignItems={"center"} minWidth={70}>
            <Image
              src={"/img/logo.png"}
              alt="Picture of the author"
              width={130}
              height={100}
            />
          </Box>
        </Flex>
        <Flex display={displayOff2}>
          <Box as={"div"}>
            <MenuCategoria
              categories={locale === "en" ? en.categories : es.categories}
            />
          </Box>
        </Flex>
        {/* serch */}
        <Flex display={displayOff2}>
          <chakra.form onSubmit={handleSerchProduct}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" display={"block"} />
              </InputLeftElement>

              <Input
                type={"search"}
                placeholder={locale === "en" ? en.searchs : es.searchs}
                value={values.q}
                name={"q"}
                onChange={handleInputChange}
              />
            </InputGroup>
          </chakra.form>
        </Flex>
        {/* button */}
        <Stack
          display={"flex"}
          alignItems={"center"}
          direction={"row"}
          spacing={6}
        >
          <Icon
            onClick={() => setModality(true)}
            boxSize={4}
            display={displayOn2}
            cursor={"pointer"}
          >
            <SearchIcon mx={0} />
          </Icon>
          <Popover isLazy>
            <PopoverTrigger>
              <Box position={"relative"}>
                {check.length > 0 ? (
                  <Button
                    size="xs"
                    px={0}
                    variant={"secondary"}
                    onClick={() =>
                      handleSerchProductCart(locale === "en" ? en.you : es.you)
                    }
                  >
                    <CartIcon boxSize={points11} />
                  </Button>
                ) : (
                  <Button
                    size="xs"
                    mx={{ base: 2, sm: 3 }}
                    variant={"secondary"}
                    px={0}
                    display={"block"}
                  >
                    <CartIcon boxSize={{ base: 6, sm: 7 }} />
                  </Button>
                )}

                <Flex
                  right={-1}
                  top={-2}
                  zIndex={-10}
                  border={bordes}
                  alignItems={"center"}
                  justifyContent="center"
                  backgroundColor={"brand.800"}
                  borderRadius={"full"}
                  position={"absolute"}
                  w={{ base: 4, sm: 5 }}
                  h={{ base: 4, sm: 5 }}
                >
                  {!activeCartSelect[0] ? 0 : activeCartSelect.length}
                </Flex>
              </Box>
            </PopoverTrigger>
            {check.length > 0 ? (
              ""
            ) : (
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  Carrito Compras
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  {/* cart */}
                  <NavbarCart />
                </PopoverBody>
              </PopoverContent>
            )}
          </Popover>
          {a?.email && a?.rol && a?.displayName ? (
            <>
              <Box position={"relative"}>
                <NavLink
                  mx={{ base: 2, sm: 3 }}
                  px={0}
                  variant={"secondary"}
                  href={`/checkout?q=${a.uid}`}
                  as={`/checkout?q=${a.uid}`}
                  name={<OrdenpagoIcon boxSize={{ base: 6, sm: 7 }} />}
                />

                <Flex
                  right={-2}
                  zIndex={-10}
                  top={0}
                  border={bordes}
                  alignItems={"center"}
                  justifyContent="center"
                  backgroundColor={"brand.800"}
                  borderRadius={"full"}
                  position={"absolute"}
                  w={{ base: 4, sm: 5 }}
                  h={{ base: 4, sm: 5 }}
                >
                  {check.length > 0 ? check.length : 0}
                </Flex>
              </Box>
            </>
          ) : (
            <NavLink
              px={{ base: 2, sm: 3 }}
              size="sm"
              variant={"secondary"}
              href={"/auth"}
              name={locale === "en" ? en.auth.aA : es.auth.aA}
            />
          )}

          {a?.email && a?.rol && a?.displayName ? (
            <Box position={"relative"}>
              <NavLink
                mx={{ base: 2, sm: 3 }}
                px={0}
                variant={"secondary"}
                href={"/cart"}
                name={<LoveIcon boxSize={{ base: 6, sm: 7 }} />}
              />
              <Flex
                right={-3}
                zIndex={-10}
                top={0}
                border={bordes}
                alignItems={"center"}
                justifyContent="center"
                backgroundColor={"brand.800"}
                borderRadius={"full"}
                position={"absolute"}
                w={{ base: 4, sm: 5 }}
                h={{ base: 4, sm: 5 }}
              >
                {!saveCartSelect[0] ? 0 : saveCartSelect.length}
              </Flex>
            </Box>
          ) : (
            <NavLink
              size="sm"
              variant={"primary"}
              href={"/auth/create"}
              name={locale === "en" ? en.auth.aH : es.auth.aH}
            />
          )}
        </Stack>
        <Flex display={displayOff2}>
          <Popover isLazy>
            <PopoverTrigger>
              {!a?.photoURL ? (
                <Avatar
                  cursor={"pointer"}
                  name={a?.displayName}
                  w={10}
                  h={10}
                />
              ) : (
                <Box position={"relative"} cursor={"pointer"}>
                  <Image
                    src={a?.photoURL}
                    alt="Perfil"
                    width={30}
                    height={30}
                  />
                </Box>
              )}
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold" borderBottomWidth={0}>
                <HStack spacing={6}>
                  <Heading size={"md"}>{a?.displayName}</Heading>
                  <Button
                    onClick={toggleColorMode}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    {colorMode === "light" ? (
                      <MoonIcon boxSize={6} />
                    ) : (
                      <SunIcon boxSize={6} />
                    )}
                  </Button>
                </HStack>
                <Text fontSize="sm">{a?.email}</Text>
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />

              <PopoverBody>
                {/* PopoverUserNavbar */}

                <PopoverUserNavbar
                  handleLogout={handleLogout}
                  HStack={HStack}
                  Heading={Heading}
                  NavLink={NavLink}
                  bg2={bg2}
                  porcent2={porcent2}
                  Button={Button}
                  es={es}
                  en={en}
                  locale={locale}
                  locales={locales}
                  asPath={asPath}
                  push={push}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      {/* BreadcrumbNavbar */}
      <BreadcrumbNavbar
        NavLink={NavLink}
        Box={Box}
        locale={locale}
        es={es}
        en={en}
      />
    </>
  );
};

export default Navbar;
