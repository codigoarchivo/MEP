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
  Portal,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";

import { CartIcon } from "../../../helpers/IconNew";
import ModeColor from "../../../helpers/ModeColor";
import Breakpoints from "../../../helpers/Breakpoints";
import NavLink from "../../../helpers/Navlink";

import { DrawerNavbar } from "./DrawerNavbar";
import { DialogSerchNavbar } from "./DialogSerchNavbar";
import { BreadcrumbNavbar } from "./BreadcrumbNavbar";
import PopoverUserNavbar from "./PopoverUserNavbar";

import { useModality } from "../../../hooks/useModality";
import useAuth from "../../../hooks/useAuth";

import { logout } from "../../../actions/auth";
import NavbarCart from "./NavbarCart";

const Navbar = () => {
  // dispatch
  const dispatch = useDispatch();
  // dispatch
  const router = useRouter();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // Modality
  const { modality, setModality } = useModality();
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();
  // drawer
  const { isOpen, onClose, onOpen } = useDisclosure();
  // useAuth
  const { isloggedIn } = useAuth();
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
  } = Breakpoints();

  const handleLogout = () => {
    dispatch(logout());

    if (logout) {
      router.push("/");
    }
  };

  return (
    <>
      {/* DrawerNavbar */}
      <DrawerNavbar
        isOpen={isOpen}
        onClose={onClose}
        Menu={Menu}
        MenuButton={MenuButton}
        Portal={Portal}
        MenuList={MenuList}
        MenuItem={MenuItem}
        Link={Link}
        Icon={Icon}
        SunIcon={SunIcon}
        MoonIcon={MoonIcon}
        toggleColorMode={toggleColorMode}
        colorMode={colorMode}
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
      <Container maxW={"container.xl"}>
        <chakra.nav>
          <Grid
            gridTemplateColumns={repeat4}
            rowGap={5}
            alignItems={"center"}
            py={5}
            boxShadow="md"
          >
            <GridItem
              colSpan={3}
              justifyContent={"center"}
              display={displayOn2}
            >
              <Icon boxSize={6} mx={7} cursor={"pointer"} onClick={onOpen}>
                <HamburgerIcon />
              </Icon>
            </GridItem>
            <GridItem colSpan={points15}>
              <HStack spacing={3} mx={7} justifyContent="space-around">
                <Image
                  src="/img/logo.png"
                  alt="Picture of the author"
                  width={60}
                  height={80}
                />
                <Box as={"div"} display={displayOff2}>
                  <Menu>
                    <MenuButton>Categoria</MenuButton>
                    <Portal>
                      <MenuList display={displayOff2}>
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
                </Box>
              </HStack>
            </GridItem>
            <GridItem colSpan={points5}>
              <Icon
                onClick={() => setModality(true)}
                boxSize={4}
                display={displayOn2}
                cursor={"pointer"}
                mx={{ base: "5" }}
              >
                <SearchIcon />
              </Icon>
              <InputGroup display={displayOff2}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input type={"search"} placeholder="Buscar" />
              </InputGroup>
            </GridItem>
            <GridItem colSpan={1} justifySelf="center">
              <Popover isLazy z> 
                <PopoverTrigger>
                  <Button size="xs" px={0} variant={"secondary"}>
                    <CartIcon boxSize={points11} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent >
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
              </Popover>
            </GridItem>
            <GridItem colSpan={5} display={displayOff2}>
              <Flex mx={4} justifyContent="space-around" alignItems={"center"}>
                {isloggedIn ? (
                  <NavLink
                    px={0}
                    size="md"
                    variant={"secondary"}
                    href={"/"}
                    name={"Voy Comprar"}
                  />
                ) : (
                  <NavLink
                    px={0}
                    size="md"
                    variant={"secondary"}
                    href={"/account"}
                    name={"Inicia Sesión"}
                  />
                )}

                {isloggedIn ? (
                  <NavLink
                    size="md"
                    variant={"primary"}
                    href={"/"}
                    name={"Para algo"}
                  />
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
                    {!activeSelect?.photoURL ? (
                      <Avatar
                        cursor={"pointer"}
                        name={activeSelect?.displayName}
                      />
                    ) : (
                      <AspectRatio
                        ratio={16 / 9}
                        w={30}
                        h={30}
                        position={"relative"}
                        cursor={"pointer"}
                      >
                        <Image
                          src={activeSelect?.photoURL}
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
                        <Heading size={"md"}>
                          {activeSelect?.displayName}
                        </Heading>
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
                      <Text fontSize="sm">{activeSelect?.email}</Text>
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <Divider
                      orientation="horizontal"
                      variant={"dashed"}
                      bg={bg2}
                    />
                    <PopoverBody>
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
      <BreadcrumbNavbar
        activeSelect={activeSelect}
        Heading={Heading}
        HStack={HStack}
        Grid={Grid}
        GridItem={GridItem}
        NavLink={NavLink}
        Box={Box}
      />
    </>
  );
};

export default Navbar;
