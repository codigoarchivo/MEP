import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
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

const Navbar = () => {
  // router
  const router = useRouter();
  // toogle serch
  const [isSerch, setIsSerch] = useState(false);
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();
  // drawer
  const { isOpen, onClose, onOpen } = useDisclosure();
  // mode Color
  const { bgInput } = ModeColor();
  // Breakpoints
  const {
    displayOn2,
    displayOff2,
    points5,
    points11,
    points13,
    points15,
    points16,
  } = Breakpoints();

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
        isSerch={isSerch}
        setIsSerch={setIsSerch}
        InputGroup={InputGroup}
        InputLeftElement={InputLeftElement}
        Input={Input}
        SearchIcon={SearchIcon}
        bgInput={bgInput}
      />
      <Grid
        gridTemplateColumns={{ base: "repeat(11, 1fr)", md: "repeat(13, 1fr)" }}
        rowGap={5}
        as={"nav"}
        alignItems={"center"}
        py={5}
      >
        <GridItem colSpan={3} justifyContent={"center"} display={displayOn2}>
          <Icon boxSize={6} mx={7} cursor={"pointer"} onClick={onOpen}>
            <HamburgerIcon />
          </Icon>
        </GridItem>
        <GridItem colSpan={points15}>
          <HStack spacing={8} mx={3} justifyContent="center">
            <Image
              src="/img/EDGARS PENDULUM.png"
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
            onClick={() => setIsSerch(true)}
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
            <Input bg={bgInput} type={"search"} placeholder="Buscar" />
          </InputGroup>
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Popover isLazy>
            <PopoverTrigger>
              <Button size="xs" px={0} variant={"secondary"}>
                <CartIcon boxSize={points11} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">
                Popover placement
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </GridItem>
        <GridItem colSpan={5} display={displayOff2}>
          <HStack mx={4} spacing={points16}>
            <Button
              size="md"
              px={0}
              variant={"secondary"}
              // onClick={() =>
              //   router.push({
              //     pathname: "/account/[p]",
              //     query: { p: "login" },
              //   })
              // }
            >
              <NavLink href={"/account/login"} name={"Inicia Sesión"} />
            </Button>
            <Button
              size="md"
              variant={"primary"}
              // onClick={() =>
              //   router.push({
              //     pathname: "/account/[p]",
              //     query: { p: "create-user" },
              //   })
              // }
            >
              <NavLink href={"/account/create"} name={"Regístrate"} />
            </Button>

            <Popover isLazy>
              <PopoverTrigger>
                <Avatar
                  boxSize={points13}
                  src="https://bit.ly/dan-abramov"
                  name="Dan Abrahmov"
                  cursor={"pointer"}
                >
                  <AvatarBadge
                    boxSize={{ base: ".8em", md: "1.10em" }}
                    bg="green.500"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  <HStack spacing={6}>
                    <Heading size={"md"}>Jackson Quintero</Heading>
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
                  <Text fontSize="sm">jackosn@gmail.com</Text>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Navbar;
