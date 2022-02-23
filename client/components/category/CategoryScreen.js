import React from "react";

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
  useDisclosure,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import {
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  NotAllowedIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

const CategoryScreen = (props) => {
  // router
  const router = useRouter();
  // disclosure
  const { isOpen, onToggle } = useDisclosure();
  // breakpoints
  const { points18 } = Breakpoints();

  // edit
  const handleEdit = () => {
    router.push({
      pathname: "/category/[pid]",
      query: { pid: props.id, word: "Edit" },
    });
  };

  // delete
  const handleDelete = () => {
    router.push({
      pathname: "/category/[pid]",
      query: { pid: props.id, word: "Delete" },
    });
  };

  return (
    <>
      <Tr >
        <Td p={3}>
          <Text>{props.nombre}</Text>
        </Td>
        <Td textAlign={"center"}>
          <Menu matchWidth>
            <MenuButton variant="outline">
              <PlusSquareIcon
                w={points18}
                h={points18}
                top={"35%"}
                left={"40%"}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                {" "}
                {isOpen ? (
                  <HStack
                    spacing={3}
                    cursor={"pointer"}
                    fontWeight={"normal"}
                    width="full"
                  >
                    <CheckCircleIcon w={3} h={3} />
                    <Text>Activo</Text>
                  </HStack>
                ) : (
                  <HStack
                    spacing={3}
                    cursor={"pointer"}
                    fontWeight={"normal"}
                    width="full"
                  >
                    <NotAllowedIcon w={3} h={3} />
                    <Text>inActivo</Text>
                  </HStack>
                )}
              </MenuItem>
              <MenuItem>
                <HStack
                  spacing={3}
                  cursor={"pointer"}
                  fontWeight={"normal"}
                  width="full"
                >
                  <ExternalLinkIcon w={3} h={3} />
                  <Text>Detalles</Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                {" "}
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
                {" "}
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

export default CategoryScreen;
