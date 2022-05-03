import React from "react";

import { Box, Divider, List, ListItem, Select } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import {
  About,
  Category,
  Global,
  Home,
  Logout,
  Perfil,
  Product,
  ShopAll,
} from "../../../helpers/IconNew";

const PopoverUserNavbar = ({
  HStack,
  Heading,
  NavLink,
  bg2,
  porcent2,
  Button,
  handleLogout,
}) => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);

  return (
    <>
      <List spacing={3} py={5}>
        <ListItem>
          <NavLink
            leftIcon={<Home />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/"}
            name={"Home"}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <NavLink
            leftIcon={<About />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/about"}
            name={"About"}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        {activeSelect?.rol === "owner" && (
          <>
            <ListItem>
              <NavLink
                leftIcon={<Category />}
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/category"}
                name={"category"}
              />
            </ListItem>
            <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
            <ListItem>
              <NavLink
                leftIcon={<Product />}
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/product"}
                name={"product"}
              />
            </ListItem>
            <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
          </>
        )}
        <ListItem>
          <NavLink
            leftIcon={<ShopAll />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/search"}
            name={"Shop All"}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <NavLink
            leftIcon={<Perfil />}
            href={"/user"}
            fontWeight={"normal"}
            variant={"secondary"}
            name={"Editar Perfil"}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <Button
            variant={"secondary"}
            fontWeight={"normal"}
            leftIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <HStack w={"full"} alignItems={"stretch"}>
            <Box w={6} h={6} as={Global} />

            <Heading textTransform={"uppercase"} size="sm">
              Idioma
            </Heading>

            <Select placeholder="English" size="sx" fontSize={"sm"}>
              <option value="option1">Español</option>
            </Select>
          </HStack>
        </ListItem>
      </List>
    </>
  );
};

export default PopoverUserNavbar;
