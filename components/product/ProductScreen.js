import React, { useMemo, useRef } from "react";

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

import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

const ProductScrenn = ({ id, na, cn, ct, ds, dt, im, pr }) => {
  // selector
  const { list } = useSelector(({ category }) => category);
  // router
  const router = useRouter();
  // useRef
  const listCt = useRef([]);

  useMemo(() => {
    listCt.current = list.filter((item) => item.id === ct);
  }, [list, ct]);

  // edit
  const handleEdit = () => {
    router.push({
      pathname: "/set/[id]",
      query: { id, set: "edit" },
    });
  };

  // delete
  const handleDelete = () => {
    router.push({
      pathname: "/set/[id]",
      query: { id, set: "delete" },
    });
  };

  // detalles
  const handleDetails = () => {
    router.push({
      pathname: "/set/[id]",
      query: { id: "1", set: "details", dt },
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
          <Text>{listCt.current[0]?.na}</Text>
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

export default ProductScrenn;
