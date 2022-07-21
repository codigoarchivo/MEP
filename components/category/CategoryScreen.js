import React from "react";

import PropTypes from "prop-types";

import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

import { Toast } from "../../helpers/Toast";

import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";

import { dbCategoryValid } from "../../data/dbCategory";

export const CategoryScrenn = ({ id, na, edi, del, cC, push }) => {
  // edit
  const handleEdit = async () => {
    // evita que se pueda editar  un producto que posee una categoria
    const { r } = await dbCategoryValid(id, "dbCatOne");

    if (r > 0) {
      return Toast(cC, "error", 5000);
    }

    push({
      pathname: "/admin/set/[id]",
      query: { id, na, pid: "Edit" },
    });
  };

  // delete
  const handleDelete = async () => {
    // evita que se pueda eliminar  un producto que posee una categoria
    const { r } = await dbCategoryValid(id, "dbCatOne");

    if (r > 0) {
      return Toast(cC, "error", 5000);
    }

    push({
      pathname: "/admin/set/[id]",
      query: { id, na, pid: "Delete" },
    });
  };

  return (
    <>
      <Tr>
        <Td>
          <Text>{na}</Text>
        </Td>
        <Td isNumeric>
          <Menu>
            <MenuButton variant="outline">
              <PlusSquareIcon w={6} h={6} />
            </MenuButton>
            <MenuList minWidth={0}>
              <MenuItem>
                <HStack
                  spacing={3}
                  cursor={"pointer"}
                  fontWeight={"normal"}
                  width="full"
                  onClick={handleEdit}
                >
                  <EditIcon w={3} h={3} />
                  <Text>{edi}</Text>
                </HStack>
              </MenuItem>

              <MenuItem>
                <HStack
                  spacing={3}
                  cursor={"pointer"}
                  fontWeight={"normal"}
                  width="full"
                  onClick={handleDelete}
                >
                  <DeleteIcon w={3} h={3} />
                  <Text>{del}</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    </>
  );
};

CategoryScrenn.propTypes = {
  id: PropTypes.string.isRequired,
  na: PropTypes.string.isRequired,
  edi: PropTypes.string,
  del: PropTypes.string,
  cC: PropTypes.string,
  push: PropTypes.func,
};
