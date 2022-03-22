import React from "react";

import { useDispatch } from "react-redux";

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

import Breakpoints from "../../helpers/Breakpoints";

import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";

import { activeCategory } from "../../actions/category";

const CategoryScrenn = ({ id, na }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // breakpoints
  const { center, points18 } = Breakpoints();

  // edit
  const handleEdit = () => {
    dispatch(
      activeCategory({
        word: "Edit",
        na,
        id,
      })
    );

    router.push({
      pathname: "/category/[pid]",
      query: { pid: id, word: "Edit" },
    });
  };

  // delete
  const handleDelete = () => {
    dispatch(
      activeCategory({
        word: "Delete",
        na,
        id,
      })
    );

    router.push({
      pathname: "/category/[pid]",
      query: { pid: id, word: "Delete" },
    });
  };

  return (
    <>
      <Tr>
        <Td textAlign={center} py={2}>
          <Text>{na}</Text>
        </Td>
        <Td textAlign={center} py={2}>
          <Menu>
            <MenuButton variant="outline">
              <PlusSquareIcon
                w={points18}
                h={points18}
                top={"35%"}
                left={"40%"}
              />
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
