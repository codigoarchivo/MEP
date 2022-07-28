import React from "react";

import PropTypes from "prop-types";

import { DragHandleIcon } from "@chakra-ui/icons";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";

import Image from "next/image";

import { Rating } from "react-simple-star-rating";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";
import { messagesCant } from "../../actions/checkout";

export const SerchMessage = (item) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();

  const handleReview = () => {
    let el = [];

    item.message.map((i) => {
      if (String(i.id) !== item.id) {
        el.push(i.rat);
      }
    });

    dispatch(messagesCant(el));

    router.push({
      pathname: "/review",
      query: {
        // id producto
        p: item.pid,
        // id mensaje
        g: item.id,
        i: "edit",
      },
    });
  };

  const data = useBreakpointValue({ base: 15, md: 20 });

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        p={{ base: 2, md: 5 }}
        overflowX={"hidden"}
      >
        <Stack spacing={0}>
          <Box position={"relative"}>
            <Image
              src={item.pho || "https://via.placeholder.com/40.png?text=Imagen"}
              alt={item.nam}
              width={40}
              height={40}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>

          <VStack spacing={1} w={"full"}>
            <Heading
              w={"full"}
              size={{ base: "x-small", sm: "sm" }}
              textTransform={"capitalize"}
            >
              {item.nam}
            </Heading>

            <HStack w={"full"}>
              <Box>
                <Rating size={data} ratingValue={item.rat} readonly={true} />
              </Box>
              <Box as="span" color="gray.600" fontSize="sm">
                hace{" "}
                {formatDistanceToNow(item.cre, {
                  locale: localEs,
                })}
              </Box>
            </HStack>

            <Text w={"full"} overflowX={"hidden"}>
              {item.com}
            </Text>
          </VStack>
        </Stack>

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
      <Divider w={"full"} mt={{ base: 0, md: 5 }} borderBottom={bordes} />
    </>
  );
};

SerchMessage.propTypes = {
  item: PropTypes.object,
};
