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

import { activeOrInactive } from "../../actions/product";

const ProductScrenn = (props) => {
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
      })
    );

    router.push({
      pathname: "/product/[pid]",
      query: { pid: props.id, word: "Edit" },
    });
  };

  // delete
  const handleDelete = () => {
    dispatch(
      activeProduct({
        word: "Delete",
      })
    );

    router.push({
      pathname: "/product/[pid]",
      query: { pid: props.id, word: "Delete" },
    });
  };

  // detalles
  const handleDetails = () => {
    dispatch(
      activeProduct({
        word: "Details",
      })
    );


    router.push({
      pathname: "/product/[pid]",
      query: { pid: props.id, word: "Details" },
    });
  };
  // Active or Inactive
  const handleActiveOrInactive = (data) => {
    dispatch(activeOrInactive(data));
    onToggle(data.estado === 1 ? false : true);
  };

  return (
    <>
      <Tr>
        <Td>
          <AspectRatio ratio={1} w={59} h={59}>
            <Image
              src={`/img/${props.image}.jpg`}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
        </Td>
        <Td>
          <Text>{props.nombre}</Text>
        </Td>
        <Td display={displayOff3}>
          <Text>{props.precio}$</Text>
        </Td>
        <Td display={displayOff3}>
          <Text>{props.category}</Text>
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
                {props.estado === 1 ? (
                  <HStack
                    spacing={3}
                    cursor={"pointer"}
                    fontWeight={"normal"}
                    width="full"
                    onClick={() =>
                      handleActiveOrInactive({
                        estado: 0,
                        id: props.id,
                      })
                    }
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
                    onClick={() =>
                      handleActiveOrInactive({
                        estado: 1,
                        id: props.id,
                      })
                    }
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
