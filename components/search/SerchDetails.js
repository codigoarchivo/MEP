import React, { useMemo } from "react";

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import PropTypes from "prop-types";

import { Rating } from "react-simple-star-rating";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";
import { CartIcon } from "../../helpers/IconNew";

import { activeProductCart } from "../../actions/product";

import { SerchRat } from "../../components/search/SerchRat";
import { SerchMessage } from "../../components/search/SerchMessage";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { messagesAccumulate } from "../../actions/checkout";

export const SerchDetails = ({
  message = [],
  msg = [],
  product = {},
  push,
  locale,
  es,
  en,
}) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { listData: list = [] } = useSelector(({ listca }) => listca);
  // Breakpoints
  const { content5, full, bordes, points25 } = Breakpoints();
  // list Category
  const listCt = useMemo(() => list.filter((i) => i.id === product.ct), [
    list,
    product.ct,
  ]);
  // Incremen and Decrement
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: product.cn - 1,
  });
  // inc
  const inc = getIncrementButtonProps();
  // dec
  const dec = getDecrementButtonProps();
  // input
  const input = getInputProps({ isReadOnly: true });

  const cn = Number(input.value);
  product.cnr = product.cn - cn;

  // select product in cart
  const handleSelect = () => {
    //? product.pj : es el porcentaje que coloca onwer
    const err = locale === "en" ? en.error : es.error;
    const added = locale === "en" ? en.cart.cG : es.cart.cG;
    const already = locale === "en" ? en.cart.cH : es.cart.cH;
    dispatch(
      activeProductCart(
        {
          ...product,
          cn,
        },
        err,
        added,
        already
      )
    );

    push("/cart");
  };

  const next = () => {
    const q = query(
      collection(db, "serchs", product.id, "messages"),
      orderBy("cre", "desc"),
      startAfter(message[message.length - 1].cre),
      limit(5)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (data.length !== 0) {
        dispatch(messagesAccumulate(data));
      }
    });
  };

  return (
    <>
      <Stack flexDirection={content5} spacing={0}>
        <Box
          position={"relative"}
          w={full}
          textAlign={"center"}
          mr={{ base: 0, md: 10 }}
          mb={{ base: 10, md: 0 }}
        >
          <Image
            src={
              product.im || "https://via.placeholder.com/450.png?text=Imagen"
            }
            alt={locale === "en" ? product.na.en : product.na.es}
            width={450}
            height={450}
            objectFit="cover"
            objectPosition="center"
            style={{
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>

        <VStack spacing={{ base: 3, md: 6 }} w={full}>
          <Heading w={full} fontSize={points25} textTransform={"capitalize"}>
            {locale === "en" ? product.na.en : product.na.es}
          </Heading>
          <HStack w={full}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              {product?.rat?.nam || "0.0"}
            </Text>{" "}
            <Box p={0.5}>
              <Rating
                size={25}
                ratingValue={product?.rat?.est || 0}
                readonly={true}
              />
            </Box>
          </HStack>
          <Box w={full}>
            <Badge colorScheme="green">Stock ({product.cn - 1})</Badge>
          </Box>
          <HStack w={full}>
            <Heading textTransform={"uppercase"} as="h3" size="sm">
              {locale === "en" ? en.price : es.price}:
            </Heading>
            <Text>${product.pr * Number(input.value)}</Text>
          </HStack>
          <HStack w={full}>
            <Heading textTransform={"uppercase"} as="h3" size="sm">
              {locale === "en" ? en.search.sJ : es.search.sJ}:
            </Heading>
            <Text w={full}>
              {locale === "en" ? product.ds.en : product.ds.es}
            </Text>
          </HStack>
          <Box w={full}>
            <HStack maxW="180px">
              <Button fontSize={20} variant={"primary"} {...dec}>
                -
              </Button>
              <Input {...input} />
              <Button fontSize={20} variant={"primary"} {...inc}>
                +
              </Button>
            </HStack>
          </Box>
          <HStack w={full}>
            <Heading textTransform={"uppercase"} as="h3" size="sm">
              {locale === "en" ? en.major.mF : es.major.mF}:
            </Heading>
            <Text>{locale === "en" ? listCt[0]?.na.en : listCt[0]?.na.es}</Text>
          </HStack>
          <Box w={full}>
            <Button
              rightIcon={<CartIcon />}
              variant={"primary"}
              onClick={handleSelect}
            >
              {locale === "en" ? en.add : es.add}
            </Button>
          </Box>
        </VStack>
      </Stack>

      <HStack mt={10} border={bordes} p={{ base: 1, md: 5 }}>
        <Tabs w={"full"}>
          <TabList>
            <Tab>{locale === "en" ? en.details : es.details}</Tab>
            <Tab>
              ({message.length || 0}){" "}
              {locale === "en" ? en.reviews : es.reviews}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={{ base: 2, md: 5 }}>
              <Text overflowX={"hidden"}>
                {locale === "en" ? product.dt.en : product.dt.es}
              </Text>
            </TabPanel>
            <TabPanel p={{ base: 0, md: 10 }}>
              <>
                <Stack mb={10} border={bordes}>
                  <HStack p={{ base: 1, md: 5 }} w={full}>
                    <Box p={{ base: 0, md: 5 }} textAlign={"center"}>
                      <Heading>{product?.rat?.nam || "0.0"}</Heading>
                      <Text>
                        {locale === "en" ? en.search.sK : es.search.sK}
                      </Text>
                    </Box>
                    <Stack w={full}>
                      {/* SerchRat */}
                      {product?.rat?.glo.map((item, key) => (
                        <SerchRat key={key} {...item} />
                      ))}
                    </Stack>
                  </HStack>
                </Stack>
                <Stack>
                  {/* SerchMessage */}
                  {message.map((item) => (
                    <SerchMessage
                      key={item.id}
                      {...item}
                      message={msg}
                      pid={product.id}
                    />
                  ))}
                  <Button variant={"primary"} onClick={next}>
                    <ArrowDownIcon />
                  </Button>
                </Stack>
              </>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </>
  );
};

SerchDetails.propTypes = {
  product: PropTypes.object,
  message: PropTypes.array,
  msg: PropTypes.array,
  push: PropTypes.func,
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
