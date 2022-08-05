import { useSelector } from "react-redux";

import { ListRoute } from "./ListRoute";

import Image from "next/image";

import { NavLink } from "../../../utils/Navlink";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { LogoutAllClear } from "./LogoutAllClear";
import { NavbarLocal } from "./NavbarLocal";
import { ModeColor } from "../../../helpers/ModeColor";

export const MenuNavButton = () => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // ListRoute
  const { dataRoute } = ListRoute();
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();

  const { modelE } = ModeColor();
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Stack direction="row" spacing={4}>
          {a.uid ? (
            <>
              <Box w={35} h={35} position={"relative"}>
                <Image
                  src={
                    a?.photoURL ||
                    "https://via.placeholder.com/35.png?text=Imagen"
                  }
                  style={{
                    borderRadius: "50%",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                  alt={"hola"}
                  layout="fill"
                  objectPosition="center"
                />
                <AvatarBadge
                  rounded={"full"}
                  border={"0.15em solid"}
                  borderColor={"papayawhip"}
                  bg="green.500"
                  w={"1em"}
                  h={"1em"}
                  transform={"translate(25%, 25%)"}
                  right={0}
                  bottom={"0px"}
                  justify={"center"}
                  position={"absolute"}
                  display={"flex"}
                />
              </Box>
            </>
          ) : (
            <Avatar size={"sm"}>
              <AvatarBadge
                borderColor="papayawhip"
                bg="tomato"
                boxSize="1.25em"
              />
            </Avatar>
          )}
        </Stack>
      </MenuButton>
      <MenuList zIndex={10} bg={modelE}>
        <MenuItem as={"div"}>
          <HStack spacing={6}>
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
        </MenuItem>
        <MenuDivider />
        {dataRoute.map(({ icon, ref, as, nam, rol }, key) => (
          <MenuItem as={"div"} key={key} display={rol && rol}>
            <NavLink
              leftIcon={icon}
              fontWeight={"normal"}
              variant={"tertiary"}
              href={ref}
              as={as}
              name={nam}
            />
          </MenuItem>
        ))}

        <MenuItem as={"div"}>
          <LogoutAllClear />
        </MenuItem>

        <MenuItem as={"div"}>
          <NavbarLocal />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
