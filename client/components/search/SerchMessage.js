import React from "react";

import { DragHandleIcon } from "@chakra-ui/icons";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";

import Image from "next/image";

import { Rating } from "react-simple-star-rating";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

const SerchMessage = (item) => {
  // router
  const router = useRouter();
  // Breakpoints
  const { content6, bordes } = Breakpoints();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // traer match sin id de manera que se pueda hacer calculo correcto
  const handleRating = () => {
    const dataSin = item.match.map((i) => i).filter((i) => i.id !== item.id);
    router.push({
      pathname: "/search/checkout/rate",
      query: {
        id: router.query.id,
        na: router.query.na,
        pr: router.query.pr,
        im: router.query.im,
        ds: router.query.ds,
        ct: router.query.ct,
        cn: router.query.cn,
        es: router.query.es,
        dt: router.query.dt,
        word: "Edit",
        com: item.com,
        idm: item.id,
        ratD: item.rat,
        li: dataSin.length > 0 ? dataSin.length : "1",
        rat: dataSin.map((item) => item.rat),
      },
    });
  };

  return (
    <>
      <Stack flexDirection={content6} spacing={0} p={5}>
        <VStack mx={4} h={"full"}>
          {!item.pho ? (
            <Avatar size="md" name={item.nam} />
          ) : (
            <AspectRatio ratio={16 / 9} w={50} h={50} position={"relative"}>
              <Image
                src={item.pho}
                alt="Perfil"
                layout="fill"
                objectFit="contain"
              />
            </AspectRatio>
          )}
        </VStack>
        <VStack mx={4} w={"full"}>
          <HStack w={"full"} justifyContent={"space-between"}>
            <Heading size={"md"}>{item.nam}</Heading>
            {item.uid === activeSelect?.uid ? (
              <Tooltip
                hasArrow
                label="Editar Reseñas"
                bg="brand.700"
                color={"Background.900"}
              >
                <Button variant={"secondary"} onClick={handleRating}>
                  <DragHandleIcon />
                </Button>
              </Tooltip>
            ) : (
              ""
            )}
          </HStack>

          <HStack w={"full"}>
            <Box>
              <Rating size={25} ratingValue={item.rat} readonly={true} />
            </Box>
            <Box as="span" color="gray.600" fontSize="sm">
              hace{" "}
              {formatDistanceToNow(item.cre, {
                locale: localEs,
              })}
            </Box>
          </HStack>
          <Text w={"full"}>{item.com}</Text>
        </VStack>
      </Stack>
      <Divider w={"full"} mt={5} borderBottom={bordes} />
    </>
  );
};

export default SerchMessage;
