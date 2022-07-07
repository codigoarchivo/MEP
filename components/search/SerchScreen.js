import React, { useMemo, useRef } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Rating } from "react-simple-star-rating";

import Image from "next/image";

import {
  Box,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
  useDisclosure,
  Collapse,
  Flex,
  Badge,
  WrapItem,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";

import { cartSaveLatest, saveProductCart } from "../../actions/product";

import { LoveIcon } from "../../helpers/IconNew";
import Toast from "../../helpers/Toast";
import Breakpoints from "../../helpers/Breakpoints";
import { ShopAll } from "../../helpers/IconNew";

const SerchScreen = ({
  id,
  na,
  cn,
  ct,
  ds,
  dt,
  im,
  pr,
  rat,
  ps,
  uid,
  push,
  pj,
  sD,
  sE,
  sF,
  sG,
  sH,
  err,
}) => {
  // useRef
  const match = useRef();
  // useRef
  const matchValid = useRef();
  // Breakpoints
  const { bordes } = Breakpoints();
  // selector
  const { activeCartSelect = [], saveCartSelect = [] } = useSelector(
    ({ process }) => process
  );

  // dispatch
  const dispatch = useDispatch();
  // disclosure
  const { isOpen, onToggle } = useDisclosure();

  // data product
  const data = {
    id,
    na,
    pr,
    im,
    ds,
    ct,
    cn,
    dt,
    ps,
    uid,
    est: rat?.est,
    nam: rat?.nam,
    pj,
  };

  // ref
  match.current = useMemo(
    () => activeCartSelect.map((item) => item.id).includes(id),
    [activeCartSelect, id]
  );
  // ref
  matchValid.current = useMemo(
    () => saveCartSelect.map((item) => item.id).includes(id),
    [saveCartSelect, id]
  );

  // select
  const handleSelect = () => {
    // activeCartSelect
    if (match.current) {
      return Toast(sD, "error", 5000);
    }
    // saveCartSelect
    if (matchValid.current) {
      push({
        pathname: "/cart",
        query: { pid: id },
      });
      return Toast(sE, "info", 5000);
    }

    // dispatch
    push({
      pathname: "/search/[id]",
      query: {
        id,
      },
    });

    dispatch(cartSaveLatest(data, err));
  };

  // save
  const handleSave = () => {
    // activeCartSelect
    if (match.current) {
      return Toast(sF, "error", 5000);
    } else {
      Toast(
        matchValid.current ? sG : sH,
        matchValid.current ? "error" : "success",
        5000
      );

      dispatch(saveProductCart(data, err));
    }
  };

  return (
    <>
      <WrapItem mx={5} justifyContent={"center"} py={{ base: 5, sm: 0 }}>
        <Box position={"relative"}>
          <Box
            as={LoveIcon}
            color={matchValid.current ? "red" : "GrayText"}
            position={"absolute"}
            zIndex={1}
            left={3}
            top={3}
            cursor={"pointer"}
            onClick={handleSave}
          />
        </Box>
        <Box
          height={"410px"}
          w="250px"
          position={"relative"}
          onClick={handleSelect}
        >
          <VStack
            spacing={0}
            onMouseEnter={() => onToggle()}
            onMouseLeave={() => onToggle()}
            cursor={"pointer"}
            w="250px"
            position={"absolute"}
            backgroundColor={"#fff"}
            border={bordes}
            rounded="md"
            _hover={{
              maxHeight: "410px",
              minHeight: "330px",
              boxShadow: "lg",
            }}
          >
            <Box position={"relative"}>
              <Image
                src={im || "https://via.placeholder.com/248.png?text=Imagen"}
                alt={na}
                width={248}
                height={248}
                objectFit="cover"
                objectPosition="center"
                style={{
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
              />
            </Box>

            <Box p={3} w={"full"}>
              <Flex align="baseline" w={"full"}>
                <Badge colorScheme="green">{ps}</Badge>
              </Flex>

              <HStack w={"full"} spacing={0}>
                <Rating
                  size={17}
                  ratingValue={rat !== undefined ? rat.est : 0}
                  readonly={true}
                />
                <Text
                  h={"full"}
                  color="gray.600"
                  fontSize={"lg"}
                  fontWeight={"bold"}
                >
                  {rat !== undefined ? rat.nam : "0.0"}
                </Text>{" "}
              </HStack>

              <Stat size={"sm"} width={"full"}>
                <StatLabel textTransform={"capitalize"}>{na}</StatLabel>
                <StatNumber>
                  <HStack w={"full"} justifyContent={"space-between"}>
                    <Text>${pr}</Text>
                    <Icon as={ShopAll} w={6} h={6} />
                  </HStack>
                </StatNumber>
                <Collapse in={isOpen} animateOpacity>
                  <StatHelpText mt={2}>{ds}</StatHelpText>
                </Collapse>
              </Stat>
            </Box>
          </VStack>
        </Box>
      </WrapItem>
    </>
  );
};

SerchScreen.propTypes = {
  id: PropTypes.string.isRequired,
  na: PropTypes.string.isRequired,
  cn: PropTypes.number.isRequired,
  ct: PropTypes.string.isRequired,
  ds: PropTypes.string.isRequired,
  dt: PropTypes.string.isRequired,
  im: PropTypes.string.isRequired,
  pr: PropTypes.number.isRequired,
  ps: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  pj: PropTypes.number.isRequired,
  sD: PropTypes.string,
  sE: PropTypes.string,
  sF: PropTypes.string,
  sG: PropTypes.string,
  sH: PropTypes.string,
};

export default SerchScreen;
