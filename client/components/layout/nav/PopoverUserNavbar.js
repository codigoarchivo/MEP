import React from "react";

import { Divider, List, ListItem, Select } from "@chakra-ui/react";

import { useSelector } from "react-redux";

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
        {activeSelect?.rol === "owner" && (
          <>
            <ListItem>
              <NavLink
                href={"/category"}
                fontWeight={"normal"}
                size={"sm"}
                variant={"secondary"}
                name={"Category"}
              />
            </ListItem>
            <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
          </>
        )}
        <ListItem>
          <NavLink
            href={"/product"}
            fontWeight={"normal"}
            size={"sm"}
            variant={"secondary"}
            name={"Product"}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <HStack spacing={3} w={"full"}>
            <Heading size="sm" fontWeight={"normal"} px={3}>
              Idioma
            </Heading>{" "}
            <Select placeholder="English" size="sm" w={porcent2}>
              <option value="option1">Español</option>
            </Select>
          </HStack>
        </ListItem>
        <ListItem>
          <Button
            variant={"secondary"}
            fontWeight={"normal"}
            px={3}
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default PopoverUserNavbar;
