import React from "react";

import { StarIcon } from "@chakra-ui/icons";

import Image from "next/image";

import { useSelector } from "react-redux";

import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Container,
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

import Breakpoints from "../../helpers/Breakpoints";
import { CartIcon } from "../../helpers/IconNew";

import Layout from "../../components/layout/layout";

const Details = () => {
  // selector
  const { activeSelect } = useSelector(({ product }) => product);
  // Breakpoints
  const { content5, full } = Breakpoints();
  // Incremen and Decrement
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 20,
  });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });
  // values
  const { id, na, pr, im, ds, ct, cn, es, dt } = activeSelect;
  return (
    <Layout>
      <Container maxW="container.lg">
        <Stack flexDirection={content5}>
          <VStack>
            <AspectRatio w="500px" h={"auto"} position={"relative"}>
              <Image
                src={im}
                alt="Picture of the author"
                layout="fill"
                objectFit="contain"
              />
            </AspectRatio>
          </VStack>

          <VStack p={5} spacing={4}>
            <Heading>{na}</Heading>
            <HStack w={full}>
              <Box as={StarIcon} color="orange.400" />
              <Text ml={1} fontSize="sm">
                <b>4.84</b> (190)
              </Text>
            </HStack>
            <Box w={full}>
              <Badge colorScheme="green">En stock ({cn})</Badge>
            </Box>
            <Heading w={full} as="h1" size="md" fontWeight={"normal"}>
              Precio: ${pr}
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
            <Box w={full}>
              <Button rightIcon={<CartIcon />} variant={"primary"} {...inc}>
                Añadir
              </Button>
            </Box>
            <HStack w={full}>
              <Heading textTransform={"uppercase"} as="h3" size="sm">
                Categoria:
              </Heading>
              <Text>{ct?.na}</Text>
            </HStack>
          </VStack>
        </Stack>
        <HStack>
          <Tabs>
            <TabList>
              <Tab>Detalles</Tab>
              <Tab>Especificación</Tab>
              <Tab>Reviews(0)</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>{dt}</Text>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Container>
    </Layout>
  );
};
export default Details;
