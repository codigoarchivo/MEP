import { useSelector } from "react-redux";

import { ListRoute } from "./ListRoute";

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
            <Avatar size={"sm"} name={a?.displayName} src={`${a?.photoURL}`}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
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
