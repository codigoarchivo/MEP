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

import { dbProductsById } from "../../data/dbProducts";

import { LoveIcon } from "../../helpers/IconNew";
import { Toast } from "../../helpers/Toast";
import { Breakpoints } from "../../helpers/Breakpoints";
import { ShopAll } from "../../helpers/IconNew";
import { useRouter } from "next/router";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const SerchScreen = ({
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
  pj,
}) => {
  // selector
  const { activeCartSelect = [] } = useSelector(({ cart }) => cart);
  // selector
  const { saveCartSelect = [] } = useSelector(({ save }) => save);
  // useRef
  const match = useRef();
  // useRef
  const matchValid = useRef();
  // Breakpoints
  const { bordes, fondo } = Breakpoints();
  // Breakpoints
  const { push, locale } = useRouter();
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
    pj,
  };

  // cart activo
  match.current = useMemo(
    () => activeCartSelect.map((item) => item.id).includes(id),
    [activeCartSelect, id]
  );

  // guardado para mas tarde
  matchValid.current = useMemo(
    () => saveCartSelect.map((item) => item.id).includes(id),
    [saveCartSelect, id]
  );

  // cart activo
  const handleSelect = () => {
    if (cn <= 1) {
      return Toast(locale === "en-US" ? en.amount : es.amount, "info", 5000);
    }

    // activeCartSelect
    if (match.current) {
      return Toast(
        locale === "en-US" ? en.search.sD : es.search.sD,
        "error",
        5000
      );
    }

    // saveCartSelect
    if (matchValid.current) {
      push("/cart");
      return Toast(
        locale === "en-US" ? en.search.sE : es.search.sE,
        "info",
        5000
      );
    }

    // dispatch
    push({
      pathname: "/search/[id]",
      query: {
        id,
      },
    });

    const err = locale === "en-US" ? en.error : es.error;
    dispatch(cartSaveLatest(data, err));
  };

  // guardado para mas tarde
  const handleSave = async () => {
    const product = await dbProductsById(id);

    if (product.na === undefined || product.na === "") {
      return Toast(
        locale === "en-US" ? en.search.sG : es.search.sG,
        "error",
        5000
      );
    }

    if (product.cn <= 1) {
      return Toast(locale === "en-US" ? en.amount : es.amount, "info", 5000);
    }

    // activeCartSelect
    if (match.current) {
      return Toast(
        locale === "en-US" ? en.search.sF : es.search.sF,
        "error",
        5000
      );
    } else {
      Toast(
        matchValid.current
          ? locale === "en-US"
            ? en.search.sG
            : es.search.sG
          : locale === "en-US"
          ? en.search.sH
          : es.search.sH,
        matchValid.current ? "error" : "success",
        5000
      );

      const err = locale === "en-US" ? en.error : es.error;

      dispatch(saveProductCart(product, err));

      dispatch(cartSaveLatest(product, err));
    }
  };

  return (
    <>
      <WrapItem justifyContent={"center"}>
        <Box position={"relative"}>
          <Box
            as={LoveIcon}
            color={matchValid.current ? "red" : "GrayText"}
            position={"absolute"}
            zIndex={2}
            left={"20px"}
            top={0}
            p={4}
            w={12}
            h={12}
            cursor={"pointer"}
            onClick={handleSave}
          />
        </Box>
        <Box
          height={"410px"}
          w="250px"
          position={"relative"}
          onClick={handleSelect}
          mx={5}
        >
          <VStack
            spacing={0}
            onMouseEnter={() => onToggle()}
            onMouseLeave={() => onToggle()}
            cursor={"pointer"}
            w="250px"
            position={"absolute"}
            border={bordes}
            boxShadow={"dark-lg"}
            backgroundColor={fondo}
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
                alt={locale === "en-US" ? na.en : na.es}
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
                <Badge colorScheme="green">
                  {locale === "en-US" ? ps.en : ps.es}
                </Badge>
              </Flex>

              <HStack w={"full"} spacing={0}>
                <Rating
                  size={17}
                  ratingValue={rat !== undefined ? rat.est : 0}
                  readonly={true}
                />
                <Text h={"full"} fontSize={"lg"} fontWeight={"bold"}>
                  {rat !== undefined ? rat.nam : "0.0"}
                </Text>{" "}
              </HStack>

              <Stat size={"sm"} width={"full"}>
                <StatLabel textTransform={"capitalize"}>
                  {locale === "en-US" ? na.en : na.es}
                </StatLabel>
                <StatNumber>
                  <HStack w={"full"} justifyContent={"space-between"}>
                    <Text>${pr}</Text>
                    <Icon as={ShopAll} w={6} h={6} />
                  </HStack>
                </StatNumber>
                <Collapse in={isOpen} animateOpacity>
                  <StatHelpText mt={2}>
                    {locale === "en-US" ? ds.en : ds.es}
                  </StatHelpText>
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
  cn: PropTypes.number,
  id: PropTypes.string.isRequired,
  na: PropTypes.object.isRequired,
  ct: PropTypes.string.isRequired,
  ds: PropTypes.object.isRequired,
  dt: PropTypes.object.isRequired,
  im: PropTypes.string.isRequired,
  pr: PropTypes.number.isRequired,
  ps: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
  pj: PropTypes.number.isRequired,
};
