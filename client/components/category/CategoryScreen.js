import React from "react";

import { useDispatch, useSelector } from "react-redux";

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
import Toast from "../../helpers/Toast";
import ValidSave from "../../helpers/ValidSave";

import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";

import { activeCategory } from "../../actions/category";

const CategoryScrenn = ({ id, na }) => {
  // selector
  const { list } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // breakpoints
  const { center, points18 } = Breakpoints();

  // edit
  const handleEdit = async () => {
    const { match } = await ValidSave("serchs", "ct", id);
    if (!match) {
      return Toast("Category tiene un producto asociado", "error", 5000);
    } else {
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
    }
  };

  // delete
  const handleDelete = async () => {
    const { match } = await ValidSave("serchs", "ct", id);
    if (!match) {
      return Toast("Category tiene un producto asociado", "error", 5000);
    } else {
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
