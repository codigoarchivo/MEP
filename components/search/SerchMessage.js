import React, { useMemo } from "react";

import { DragHandleIcon } from "@chakra-ui/icons";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";

import Image from "next/image";

import { Rating } from "react-simple-star-rating";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
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
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);

  const handleReview = () => {
    router.push({
      pathname: "/review",
      query: {
        // id producto
        p: item.p,
        // id mensaje
        g: item.id,
        i: "edit",
      },
    });
  };

  return (
    <>
      <HStack justifyContent={"space-between"} p={5}>
        <HStack spacing={10}>
          <Box position={"relative"}>
            <Image
              src={item.pho || "https://via.placeholder.com/70.png?text=Imagen"}
              alt={item.nam}
              width={70}
              height={70}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>

          <VStack spacing={3}>
            <Heading w={"full"} size={"md"} textTransform={"capitalize"}>
              {item.nam}
            </Heading>

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
        </HStack>

        {item.uid !== a?.uid && (
          <Tooltip
            hasArrow
            label="Editar Reseñas"
            bg="brand.700"
            color={"Background.900"}
          >
            <Button variant={"secondary"} onClick={handleReview}>
              <DragHandleIcon />
            </Button>
          </Tooltip>
        )}
      </HStack>
      <Divider w={"full"} mt={5} borderBottom={bordes} />
    </>
  );
};

export default SerchMessage;
