import React from "react";

import Image from "next/image";

import { useDispatch } from "react-redux";

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

import { activeOrInactive, activeProduct } from "../../actions/product";

const ProductScrenn = ({ id, na, cn, ct, ds, dt, es, im, pr }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // disclosure
  const { onToggle } = useDisclosure();
  // breakpoints
  const { displayOff3, points18 } = Breakpoints();

  // edit
  const handleEdit = () => {
    dispatch(
      activeProduct({
        word: "Edit",
        id,
        na,
        pr,
        im,
        ds,
        ct,
        cn,
        es,
        dt,
      })
    );

    router.push({
      pathname: "/product/[pid]",
      query: { pid: id, word: "Edit" },
    });
  };

  // delete
  const handleDelete = () => {
    dispatch(
      activeProduct({
        word: "Delete",
        id,
        na,
        pr,
        im,
        ds,
        ct,
        cn,
        es,
        dt,
      })
    );

    router.push({
      pathname: "/product/[pid]",
      query: { pid: id, word: "Delete" },
    });
  };

  // detalles
  const handleDetails = () => {
    dispatch(
      activeProduct({
        word: "Details",
        dt,
      })
    );

    router.push({
      pathname: "/product/[pid]",
      query: { pid: id, word: "Details" },
    });
  };

  const handleActive = () => {
    dispatch(
      activeOrInactive({
        es: false,
        id,
      })
    );
  };

  const handleInactive = () => {
    dispatch(
      activeOrInactive({
        es: true,
        id,
      })
    );
  };
  return (
    <>
      <Tr>
        <Td>
          <AspectRatio ratio={1} w={59} h={59}>
            <Image
              src={im}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
        </Td>
        <Td>
          <Text>{na}</Text>
        </Td>
        <Td display={displayOff3}>
          <Text>{pr}$</Text>
        </Td>
        <Td display={displayOff3}>
          <Text>{ct?.na}</Text>
        </Td>
        <Td textAlign={"center"}>
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
                {es ? (
                  <HStack
                    spacing={3}
                    cursor={"pointer"}
                    fontWeight={"normal"}
                    width="full"
                    onClick={handleActive}
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
                    onClick={handleInactive}
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
