import { Flex, Menu, MenuButton, MenuList } from "@chakra-ui/react";

import { CartIcon } from "../../../helpers/IconNew";

import NavbarCart from "./NavbarCart";


const MenuCartIcon = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"secondary"}
        px={0}
        cursor={"pointer"}
        minW={0}
        onClick={() => (
          handleSerchProductCart(locale === "en" ? en.you : es.you),
          Toast(data, "info", 5000)
        )}
      >
        <CartIcon boxSize={points11} />
        <Flex
          right={-4}
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
        >
          {!activeCartSelect[0] ? 0 : activeCartSelect.length}
        </Flex>
      </MenuButton>

      <MenuList>
        <NavbarCart />
      </MenuList>
    </Menu>
  );
};

export default MenuCartIcon;
