import React from "react";

import Image from "next/image";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  AspectRatio,
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

import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

const UserScreen = ({ id, na, cn, ct, ds, dt, es, im, pr, ti, uid }) => {
  // selector
  const { list } = useSelector(({ category }) => category);
  // router
  const router = useRouter();
  // breakpoints
  const { displayOff3, points18 } = Breakpoints();

  const data = {
    id,
    na,
    pr,
    im,
    ds,
    ct,
    cn,
    es,
    dt,
    ti,
    uid,
  };

  // list Category
  const listCt = list.filter((item) => item.id === ct);

  // edit
  const handleEdit = () => {
    router.push({
      pathname: "/user/ajustar",
      query: { pid: "Edit", ...data },
    });
  };

  // delete
  const handleDelete = () => {
    router.push({
      pathname: "/user/ajustar",
      query: { pid: "Delete", ...data },
    });
  };

  // detalles
  const handleDetails = () => {
    router.push({
      pathname: "/user/ajustar",
      query: { pid: "Details", dt },
    });
  };

  return (
    <>
      <Tr>
        <Td>
          {im && (
            <AspectRatio ratio={1} w={59} h={59} position={"relative"}>
              <Image
                src={im}
                alt="Picture of the author"
                layout="fill"
                objectFit="contain"
              />
            </AspectRatio>
          )}
        </Td>
        <Td>
          <Text>{na}</Text>
        </Td>
        <Td>
          <Text>{pr}$</Text>
        </Td>
        <Td>
          <Text>{listCt[0].na}</Text>
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
                  onClick={handleDetails}
                >
                  <ExternalLinkIcon w={3} h={3} />
                  <Text>Detalles</Text>
                </HStack>
              </MenuItem>

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

export default UserScreen;
