import React from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

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
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  NotAllowedIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

import { productActiveOrInactive } from "../../actions/product";

const ProductScrenn = ({ id, na, cn, ct, ds, dt, es, im, pr }) => {
  // selector
  const { list } = useSelector(({ category }) => category);
  // dispatch
  const dispatch = useDispatch();
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
  };

  // list Category
  const listCt = list.filter((item) => item.id === ct);

  // edit
  const handleEdit = () => {
    router.push({
      pathname: "/product/[pid]",
      query: { pid: "Edit", ...data },
    });
  };

  // delete
  const handleDelete = () => {
    router.push({
      pathname: "/product/[pid]",
      query: { pid: "Delete", id },
    });
  };

  // detalles
  const handleDetails = () => {
    router.push({
      pathname: "/product/[pid]",
      query: { pid: "Details", dt },
    });
  };

  // ActiveOrInactive
  const handleActiveOrInactive = (bol) => {
    dispatch(
      productActiveOrInactive({
        ...data,
        es: bol,
      })
    );
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
                {es ? (
                  <HStack
                    spacing={3}
                    cursor={"pointer"}
                    fontWeight={"normal"}
                    width="full"
                    onClick={() => handleActiveOrInactive(false)}
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
                    onClick={() => handleActiveOrInactive(true)}
                  >
                    <NotAllowedIcon w={3} h={3} />
                    <Text>Pause</Text>
                  </HStack>
                )}
              </MenuItem>

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
