import React, { useMemo } from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

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

import Calculate from "../../helpers/Calculate";
import Breakpoints from "../../helpers/Breakpoints";
import { CartIcon } from "../../helpers/IconNew";

import { activeProductCart } from "../../actions/product";

import SerchRat from "../../components/search/SerchRat";
import SerchMessage from "../../components/search/SerchMessage";

const SerchDetails = ({ message = [], product = {} }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // selector
  const { list } = useSelector(({ category }) => category);
  // Breakpoints
  const { content5, full, bordes } = Breakpoints();
  // values
  const { id, na, pr, im, ds, ct, cn, dt, uid, ps, pj } = product;
  // list Category
  const listCt = list.filter((item) => item.id === ct);
  // Incremen and Decrement
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: cn,
  });
  // inc
  const inc = getIncrementButtonProps();
  // dec
  const dec = getDecrementButtonProps();
  // input
  const input = getInputProps({ isReadOnly: true });

  // Calculate product price individual y global
  const { global, globalRanking, globalPorcentaje } = useMemo(
    () => Calculate(message.map((item) => ({ rat: item.rat || 0 }))),
    [message]
  );

  // select product in cart
  const handleSelect = () => {
    dispatch(
      activeProductCart({
        id,
        na,
        pr,
        im,
        ds,
        ct,
        dt,
        ps,
        pj,
        uid,
        cnr: cn,
        cn: Number(input.value),
        rat: message.map((item) => item.rat.toString()),
      })
    );

    router.push("/cart");
  };
  return (
    <>
      <Stack flexDirection={content5} spacing={0}>
        <Box position={"relative"} w={full}>
          <Image
            src={im || "https://via.placeholder.com/450.png?text=Imagen"}
            alt={na}
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

        <VStack px={10} spacing={6} w={full}>
          <Heading w={full} textTransform={"capitalize"}>
            {na}
          </Heading>
          <HStack w={full}>
            <Text color="gray.600" fontSize={"xl"} fontWeight={"bold"}>
              {globalRanking || "0.0"}
            </Text>{" "}
            <Box p={0.5}>
              <Rating
                size={25}
                ratingValue={globalPorcentaje || 0}
                readonly={true}
              />
            </Box>
          </HStack>
          <Box w={full}>
            <Badge colorScheme="green">En stock ({cn})</Badge>
          </Box>
          <Heading w={full} as="h1" size="md" fontWeight={"normal"}>
            Precio: ${pr * input.value}
          </Heading>
          <Text w={full}>{ds}</Text>
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
              Categoria:
            </Heading>
            <Text>{listCt[0]?.na}</Text>
          </HStack>
          <Box w={full}>
            <Button
              rightIcon={<CartIcon />}
              variant={"primary"}
              onClick={handleSelect}
            >
              Añadir
            </Button>
          </Box>
        </VStack>
      </Stack>

      <HStack mt={10} border={bordes} p={5}>
        <Tabs w={"full"}>
          <TabList>
            <Tab>Detalles</Tab>
            <Tab>({message.length || 0}) reviews</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text>{dt}</Text>
            </TabPanel>
            <TabPanel>
              <>
                <Stack w={"full"} mb={10} border={bordes}>
                  <HStack p={5} w={full}>
                    <Box p={5} textAlign={"center"}>
                      <Heading>{globalRanking || "0.0"}</Heading>
                      <Text>Valoración total</Text>
                    </Box>
                    <Stack w={full}>
                      {/* SerchRat */}
                      {global.map((item, key) => (
                        <SerchRat key={key} {...item} />
                      ))}
                    </Stack>
                  </HStack>
                </Stack>
                <Box>
                  {/* SerchMessage */}
                  {message.map((item) => (
                    <SerchMessage key={item.id} {...item} p={id} />
                  ))}
                </Box>
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
};

export default SerchDetails;
