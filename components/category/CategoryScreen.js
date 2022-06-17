import React from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

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

import Toast from "../../helpers/Toast";

import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";

import { dbProducts } from "../../data/dbProducts";

const CategoryScrenn = ({ id, na }) => {
  // router
  const router = useRouter();

  // edit
  const handleEdit = async () => {
    // evita que se pueda editar  un producto que posee una categoria
    const match = await dbProducts(id, "dbProFive");

    if (match.length > 0) {
      return Toast("Category tiene un producto asociado", "error", 5000);
    }

    router.push({
      pathname: "/admin/[id]",
      query: { id, na, pid: "Edit" },
    });
  };

  // delete
  const handleDelete = async () => {
    // evita que se pueda eliminar  un producto que posee una categoria
    const match = await dbProducts(id, "dbProFive");

    if (match.length > 0) {
      return Toast("Category tiene un producto asociado", "error", 5000);
    }

    router.push({
      pathname: "/admin/[id]",
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
                  <Text>Editar</Text>
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
                  <Text>Eliminar</Text>
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
};

export default CategoryScrenn;
