import React from "react";

import Image from "next/image";

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
  SmallAddIcon,
} from "@chakra-ui/icons";

const DashboardScrenn = (props) => {
  // router
  const router = useRouter();
  // disclosure
  const { isOpen, onToggle } = useDisclosure();
  // breakpoints
  const { displayOff3, points18 } = Breakpoints();



  // edit
  const handleEdit = () => {
    router.push({
      pathname: "/product/[pid]",
      query: { pid: props.id, word: "Edit" },
    });
  };

  // delete
  const handleDelete = () => {
    router.push({
      pathname: "/product/[pid]",
      query: { pid: props.id, word: "Delete" },
    });
  };

  return (
    <>
      <Tr>
        <Td>
          <AspectRatio ratio={1} w={50} h={50}>
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
        <Td>
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

          {/* <ScaleFade initialScale={0.2} transitionEnd in={isOpen}>
            <VStack
              opacity={isOpen ? 1 : 0}
              zIndex={isOpen ? 100 : 0}
              position={"absolute"}
              left={-9}
              backgroundColor="brand.800"
              p={1}
              rounded="sm"
            ></VStack>
          </ScaleFade> */}
        </Td>
      </Tr>
    </>
  );
};

export default DashboardScrenn;
