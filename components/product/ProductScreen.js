import React, { useMemo, useRef } from "react";

import PropTypes from "prop-types";

import Image from "next/image";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";

import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

const ProductScrenn = ({ id, na, cn, ct, ds, dt, im, pr, pj, ps }) => {
  // Breakpoints
  const { full, bordes } = Breakpoints();
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
          <HStack>
            <Flex position={"relative"}>
              <Image
                src={im || "https://via.placeholder.com/155.png?text=Imagen"}
                alt="Picture of the author"
                width={155}
                height={155}
                objectFit="cover"
                objectPosition="center"
              />
            </Flex>

            <VStack spacing={1}>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  Nombre:
                </Heading>
                <Text size={"sm"}>{na}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  Descripción:
                </Heading>
                <Text size={"sm"}>{ds}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  Precio:
                </Heading>
                <Text size={"sm"}>${pr}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  Cantidad:
                </Heading>
                <Text size={"sm"}>N°{cn}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  Porcentaje:
                </Heading>
                <Text size={"sm"}>%{pj}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  Categoria:
                </Heading>
                <Text size={"sm"}>{listCt.current[0]?.na}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  Tipo:
                </Heading>
                <Text size={"sm"}>{ps}</Text>
              </HStack>
            </VStack>
          </HStack>
        </Td>

        <Td isNumeric>
          <Menu>
            <MenuButton variant="outline">
              <PlusSquareIcon w={8} h={8} />
            </MenuButton>
            <MenuList minWidth={0} border={bordes}>
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

ProductScrenn.propTypes = {
  id: PropTypes.string.isRequired,
  na: PropTypes.string.isRequired,
  cn: PropTypes.number.isRequired,
  ct: PropTypes.string.isRequired,
  ds: PropTypes.string.isRequired,
  dt: PropTypes.string.isRequired,
  im: PropTypes.string.isRequired,
  pr: PropTypes.number.isRequired,
  pj: PropTypes.number.isRequired,
  ps: PropTypes.string.isRequired,
};

export default ProductScrenn;
