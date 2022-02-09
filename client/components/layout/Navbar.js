import React from "react";

import Image from "next/image";

import {
  Avatar,
  AvatarBadge,
  Box,
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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";

import CartIcon from "../../helpers/IconNew";
import ModeColor from "../../helpers/ModeColor";

import { DrawerNavbar } from "./DrawerNavbar";
import { DialogSerchNavbar } from "./DialogSerchNavbar";

const Navbar = () => {
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();
  // mode Color
  const { bgInput } = ModeColor();
  // drawer
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
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
      <DialogSerchNavbar isOpen={isOpen} onClose={onClose} />
      <Box as={"nav"} px={5}>
        <HStack
          as={"ul"}
          listStyleType="none"
          justifyContent={"space-around"}
          h={["10vh"]}
        >
          <Box as={"li"} display={{ base: "block", md: "none" }}>
            <Icon boxSize={6} cursor={"pointer"} onClick={onOpen}>
              <HamburgerIcon />
            </Icon>
          </Box>
          <Box as={"li"} display={{ base: "none", md: "block" }}>
            <HStack spacing={10}>
              <Image
                src="/img/EDGARS PENDULUM.png"
                alt="Picture of the author"
                width={50}
                height={50}
              />
              <Menu>
                <MenuButton>Categoria</MenuButton>
                <Portal>
                  <MenuList display={{ base: "none", md: "block" }}>
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
            </HStack>
          </Box>
          <Box as={"li"} w={{ base: "full", md: "30%" }}>
            <HStack>
              <Icon
                onClick={isOpen}
                boxSize={4}
                display={{ base: "block", sm: "none" }}
                cursor={"pointer"}
                mx={{ base: "5" }}
              >
                <SearchIcon />
              </Icon>
              <InputGroup display={{ base: "none", sm: "block" }}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  bg={bgInput}
                  type={"search"}
                  placeholder="Buscar En cualquier parte"
                />
              </InputGroup>
            </HStack>
          </Box>

          <Box as={"li"}>
            <HStack spacing={{ base: 5, md: 20 }}>
              <Popover isLazy>
                <PopoverTrigger>
                  <Icon boxSize={{ base: "6", md: "8" }} cursor={"pointer"}>
                    <CartIcon />
                  </Icon>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="semibold">
                    Popover placement
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore.
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Icon
                boxSize={6}
                cursor={"pointer"}
                display={{ base: "none", md: "block" }}
                onClick={toggleColorMode}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Icon>
              <Popover isLazy>
                <PopoverTrigger>
                  <Avatar
                    boxSize={{ base: "8", md: "10" }}
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
                    Popover placement
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore.
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default Navbar;
