import React from "react";

import { useSelector } from "react-redux";

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

const CategoryScrenn = ({ id, na }) => {
  // selector
  const { list } = useSelector(({ product }) => product);
  // router
  const router = useRouter();

  // edit
  const handleEdit = async () => {
    const match = list.map((item) => item.ct).includes(id);
    if (match) {
      return Toast("Category tiene un producto asociado", "error", 5000);
    } else {
      router.push({
        pathname: "/category/[pid]",
        query: { pid: "Edit", na, id },
      });
    }
  };

  // delete
  const handleDelete = async () => {
    const match = list.map((item) => item.ct).includes(id);
    if (match) {
      return Toast("Category tiene un producto asociado", "error", 5000);
    } else {
      router.push({
        pathname: "/category/[pid]",
        query: { pid: "Delete", id },
      });
    }
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

export default CategoryScrenn;
