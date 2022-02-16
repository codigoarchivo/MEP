import React from "react";

import Image from "next/image";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
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

import { useModality } from "../../../hooks/useModality";

const Navbar = () => {
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
    points13,
    points15,
    repeat4,
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
        word={"inputSerch"}
        isSerch={modality}
        setIsSerch={setModality}
        InputGroup={InputGroup}
        InputLeftElement={InputLeftElement}
        Input={Input}
        SearchIcon={SearchIcon}
      />
      <Container maxW={"container.xl"}>
        <Grid
          gridTemplateColumns={repeat4}
          rowGap={5}
          as={"nav"}
          alignItems={"center"}
          py={5}
          boxShadow="md"
        >
          <GridItem colSpan={3} justifyContent={"center"} display={displayOn2}>
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </GridItem>
          <GridItem colSpan={5} display={displayOff2}>
            <Flex mx={4} justifyContent="space-around">
              <NavLink
                px={0}
                size="md"
                variant={"secondary"}
                href={"/account/login"}
                name={"Inicia Sesión"}
              />
              <NavLink
                size="md"
                variant={"primary"}
                href={"/account/create"}
                name={"Regístrate"}
              />
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
                  <PopoverHeader fontWeight="semibold" borderBottomWidth={0}>
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
                  <Divider
                    orientation="horizontal"
                    variant={"dashed"}
                    bg={bg2}
                  />
                  <PopoverBody>
                    <List spacing={3}>
                      <ListItem>
                        <NavLink
                          href={"/dashboard"}
                          fontWeight={"normal"}
                          size={"sm"}
                          variant={"secondary"}
                          name={"Dashboard"}
                        />
                      </ListItem>
                      <Divider
                        orientation="horizontal"
                        variant={"dashed"}
                        bg={bg2}
                      />
                      <ListItem>
                        <Button
                          fontWeight={"normal"}
                          size={"sm"}
                          variant={"secondary"}
                        >
                          Cerrar sesión
                        </Button>
                      </ListItem>
                    </List>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </GridItem>
        </Grid>
      </Container>

      {/* BreadcrumbNavbar */}
      <BreadcrumbNavbar
        Grid={Grid}
        GridItem={GridItem}
        NavLink={NavLink}
        Box={Box}
      />
    </>
  );
};

export default Navbar;
