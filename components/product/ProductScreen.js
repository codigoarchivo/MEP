import React from "react";

import PropTypes from "prop-types";

import Image from "next/image";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Box,
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

import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";
import { ModeColor } from "../../helpers/ModeColor";

export const ProductScrenn = ({ id, na, cn, ct, ds, im, pr, pj, ps }) => {
  // router
  const { push, locale } = useRouter();
  // Breakpoints
  const { full, bordes } = Breakpoints();
  // selector
  const { listData: list = [] } = useSelector(({ listca }) => listca);

  // edit
  const handleEdit = () => {
    push({
      pathname: "/set/[id]",
      query: { id, set: "edit" },
    });
  };

  // delete
  const handleDelete = () => {
    push({
      pathname: "/set/[id]",
      query: { id, set: "delete" },
    });
  };

  // detalles
  const handleDetails = () => {
    push({
      pathname: "/set/[id]",
      query: { id, set: "details" },
    });
  };

  const { modelC } = ModeColor();

  return (
    <>
      <Tr>
        <Td>
          <HStack>
            <Box w={155} h={155} position={"relative"}>
              <Image
                src={im || "https://via.placeholder.com/155.png?text=Imagen"}
                alt={locale === "en-US" ? na.en : na.es}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={100}
              />
            </Box>

            <VStack spacing={1}>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en-US" ? en.name : es.name}:
                </Heading>
                <Text size={"sm"}>{locale === "en-US" ? na.en : na.es}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en-US" ? en.description : es.description}:
                </Heading>
                <Text size={"sm"}> {locale === "en-US" ? ds.en : ds.es}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en-US" ? en.price : es.price}:
                </Heading>
                <Text size={"sm"}>${pr}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en-US" ? en.quantity : es.quantity}:
                </Heading>
                <Text size={"sm"}>N°{cn}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en-US" ? en.percentage : es.percentage}:
                </Heading>
                <Text size={"sm"}>%{pj}</Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en-US" ? en.major.mF : es.major.mF}:
                </Heading>
                <Text size={"sm"}>
                  {list.map((i) => {
                    if (i.id === ct)
                      return locale === "en-US" ? i?.na.en : i?.na.es;
                  })}
                </Text>
              </HStack>
              <HStack w={full}>
                <Heading as="h3" size="sm">
                  {locale === "en-US" ? en.guy : es.guy}:
                </Heading>
                <Text size={"sm"}>{locale === "en-US" ? ps.en : ps.es}</Text>
              </HStack>
            </VStack>
          </HStack>
        </Td>

        <Td isNumeric>
          <Menu>
            <MenuButton variant="outline">
              <PlusSquareIcon color={modelC} w={8} h={8} />
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
                  <ExternalLinkIcon color={modelC} w={3} h={3} />
                  <Text>{locale === "en-US" ? en.details : es.details}</Text>
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
                  <EditIcon color={modelC} w={3} h={3} />
                  <Text>{locale === "en-US" ? en.edit : es.edit}</Text>
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
                  <DeleteIcon color={modelC} w={3} h={3} />
                  <Text>{locale === "en-US" ? en.delete : es.delete}</Text>
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
  id: PropTypes.string,
  na: PropTypes.object.isRequired,
  cn: PropTypes.number.isRequired,
  ct: PropTypes.string.isRequired,
  ds: PropTypes.object.isRequired,
  im: PropTypes.string.isRequired,
  pr: PropTypes.number.isRequired,
  pj: PropTypes.number.isRequired,
  ps: PropTypes.object.isRequired,
};
