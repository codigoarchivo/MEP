import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import Image from "next/image";

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  Divider,
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
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";

import {
  CartIcon,
  LoveIcon,
  OrdenpagoIcon,
} from "../../../helpers/IconNew";
import ModeColor from "../../../helpers/ModeColor";
import Breakpoints from "../../../helpers/Breakpoints";
import NavLink from "../../../helpers/Navlink";

import { DrawerNavbar } from "./DrawerNavbar";
import { DialogSerchNavbar } from "./DialogSerchNavbar";
import { BreadcrumbNavbar } from "./BreadcrumbNavbar";
import PopoverUserNavbar from "./PopoverUserNavbar";

import { useModality } from "../../../hooks/useModality";

import NavbarCart from "./NavbarCart";

import { logout } from "../../../actions/auth";

import useFormChange from "../../../hooks/useFormChange";

import Toast from "../../../helpers/Toast";
import MenuCategoria from "../../../helpers/MenuCategoria";

const Navbar = () => {
  // dispatch
  const dispatch = useDispatch();
  // dispatch
  const router = useRouter();
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const {
    activeCartSelect,
    activeSelectCheck: check = [],
    saveCartSelect,
  } = useSelector(({ product }) => product);

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
  } = Breakpoints();

  const handleLogout = () => {
    dispatch(logout());

    if (logout) {
      router.push("/");
    }
  };

  const { values, reset, handleInputChange } = useFormChange({ q: "" });

  const handleSerchProduct = (e) => {
    e.preventDefault();
    const q = values.q;
    router.push({
      pathname: "/search",
      query: { q },
    });
    reset();
  };

  const handleSerchProductCart = (data) => {
    Toast(data, "info", 5000);
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
      />
      {/* DialogSerchNavbar */}
      <DialogSerchNavbar
        isSerch={modality}
        setIsSerch={setModality}
        InputGroup={InputGroup}
        InputLeftElement={InputLeftElement}
        Input={Input}
        SearchIcon={SearchIcon}
      />
      <Container maxW={"container.xs"}>
        <chakra.nav>
          <Grid
            as={"ul"}
            gridTemplateColumns={repeat4}
            alignItems={"center"}
            py={1}
          >
            <GridItem
              as={"li"}
              colSpan={3}
              justifyContent={"center"}
              display={displayOn2}
            >
              <Icon boxSize={6} mx={7} cursor={"pointer"} onClick={onOpen}>
                <HamburgerIcon />
              </Icon>
            </GridItem>
            <GridItem as={"li"} colSpan={points15}>
              <HStack mx={4} justifyContent="space-around">
                <Box
                  position={"relative"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Image
                    src={"/img/logo.png"}
                    alt="Picture of the author"
                    width={100}
                    height={70}
                  />
                </Box>
                <Box as={"div"} display={displayOff2}>
                  <MenuCategoria />
                </Box>
              </HStack>
            </GridItem>
            <GridItem as={"li"} colSpan={points5}>
              <Icon
                onClick={() => setModality(true)}
                boxSize={4}
                display={displayOn2}
                cursor={"pointer"}
                mx={{ base: "5" }}
              >
                <SearchIcon />
              </Icon>
              <chakra.form onSubmit={handleSerchProduct}>
                <InputGroup display={displayOff2}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input
                    type={"search"}
                    placeholder="Buscar"
                    value={values.q}
                    name={"q"}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </chakra.form>
            </GridItem>
            <GridItem as={"li"} colSpan={1} justifySelf="center">
              <Popover isLazy>
                <PopoverTrigger>
                  <Box position={"relative"}>
                    {check.length > 0 ? (
                      <Button
                        size="xs"
                        px={0}
                        variant={"secondary"}
                        onClick={() =>
                          handleSerchProductCart(
                            "No puede Ingresar hasta que concretes o elimine la oferta en la lista"
                          )
                        }
                      >
                        <CartIcon boxSize={points11} />
                      </Button>
                    ) : (
                      <Button size="xs" px={0} variant={"secondary"}>
                        <CartIcon boxSize={points11} />
                      </Button>
                    )}

                    <Flex
                      cursor={"pointer"}
                      right={-1}
                      top={-2}
                      border={bordes}
                      alignItems={"center"}
                      justifyContent="center"
                      backgroundColor={"brand.800"}
                      borderRadius={"full"}
                      position={"absolute"}
                      w={5}
                      h={5}
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
            </GridItem>
            <GridItem as={"li"} colSpan={5} display={displayOff2}>
              <Flex mx={4} justifyContent="space-around" alignItems={"center"}>
                {a?.email && a?.rol && a?.displayName ? (
                  <>
                    {check.length > 0 ? (
                      <Box position={"relative"}>
                        <NavLink
                          px={0}
                          variant={"secondary"}
                          href={"/search/checkout"}
                          name={<OrdenpagoIcon boxSize={points11} />}
                        />
                        <Flex
                          cursor={"pointer"}
                          right={0}
                          top={0}
                          border={bordes}
                          alignItems={"center"}
                          justifyContent="center"
                          backgroundColor={"brand.800"}
                          borderRadius={"full"}
                          position={"absolute"}
                          w={5}
                          h={5}
                        >
                          {!check[0] ? 0 : check.length}
                        </Flex>
                      </Box>
                    ) : (
                      <Box
                        position={"relative"}
                        onClick={() =>
                          handleSerchProductCart(
                            "Direjete a la lista de compras"
                          )
                        }
                      >
                        <NavLink
                          px={0}
                          variant={"secondary"}
                          href={`${router.pathname}`}
                          name={<OrdenpagoIcon boxSize={points11} />}
                        />
                        <Flex
                          cursor={"pointer"}
                          right={0}
                          top={0}
                          border={bordes}
                          alignItems={"center"}
                          justifyContent="center"
                          backgroundColor={"brand.800"}
                          borderRadius={"full"}
                          position={"absolute"}
                          w={5}
                          h={5}
                        >
                          {!check[0] ? 0 : check.length}
                        </Flex>
                      </Box>
                    )}
                  </>
                ) : (
                  <NavLink
                    px={0}
                    size="md"
                    variant={"secondary"}
                    href={"/account"}
                    name={"Inicia Sesión"}
                  />
                )}

                {a?.email && a?.rol && a?.displayName ? (
                  <Box position={"relative"}>
                    <NavLink
                      px={0}
                      variant={"secondary"}
                      href={"/search/cart"}
                      name={<LoveIcon boxSize={points11} />}
                    />
                    <Flex
                      cursor={"pointer"}
                      right={0}
                      top={0}
                      border={bordes}
                      alignItems={"center"}
                      justifyContent="center"
                      backgroundColor={"brand.800"}
                      borderRadius={"full"}
                      position={"absolute"}
                      w={5}
                      h={5}
                    >
                      {!saveCartSelect[0] ? 0 : saveCartSelect.length}
                    </Flex>
                  </Box>
                ) : (
                  <NavLink
                    size="md"
                    variant={"primary"}
                    href={"/account/create"}
                    name={"Regístrate"}
                  />
                )}

                <Popover isLazy>
                  <PopoverTrigger>
                    {!a?.photoURL ? (
                      <Avatar cursor={"pointer"} name={a?.displayName} />
                    ) : (
                      <AspectRatio
                        ratio={16 / 9}
                        w={30}
                        h={30}
                        position={"relative"}
                        cursor={"pointer"}
                      >
                        <Image
                          src={a?.photoURL}
                          alt="Perfil"
                          layout="fill"
                          objectFit="contain"
                        />
                      </AspectRatio>
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
                    <Divider
                      orientation="horizontal"
                      variant={"dashed"}
                      bg={bg2}
                    />
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
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </GridItem>
          </Grid>
        </chakra.nav>
      </Container>

      {/* BreadcrumbNavbar */}
      <BreadcrumbNavbar NavLink={NavLink} Box={Box} />
    </>
  );
};

export default Navbar;
