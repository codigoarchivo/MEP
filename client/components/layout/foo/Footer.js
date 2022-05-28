import React from "react";

import Image from "next/image";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  List,
  ListItem,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import ModeColor from "../../../helpers/ModeColor";
import Breakpoints from "../../../helpers/Breakpoints";
import NavLink from "../../../helpers/Navlink";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../../helpers/IconNew";

import MenuHistory from "../../../helpers/MenuHistory";

import MenuCategoria from "../../../helpers/MenuCategoria";

const Footer = () => {
  // Breakpoints
  const {
    repeat2,
    points3,
    points5,
    points7,
    points8,
    points9,
    points10,
    points11,
    points12,
    points14,
    content1,
    content2,
    content3,
    porcent2,
    bordes,
  } = Breakpoints();
  // mode Color
  const { bg2 } = ModeColor();

  return (
    <Container maxW={"full"} px={4} mt={20} pb={4}>
      <Grid
        templateColumns={repeat2}
        columnGap={points3}
        gridAutoRows={"minmax(50px, auto)"}
        gap={4}
        alignItems={"center"}
        backgroundColor={"brand.900"}
        py={10}
        border={bordes}
        boxShadow={"lg"}
      >
        <GridItem colSpan={points8}>
          <VStack spacing={5}>
            <Box position={"relative"} display={"flex"} alignItems={"center"}>
              <Image
                src={"/img/logo.png"}
                alt="Picture of the author"
                width={150}
                height={110}
              />
            </Box>
            <Text fontSize={"sm"} color={"brand.600"}>
              © {new Date().getFullYear()} All rights reserved
            </Text>
            <List display="flex" alignItems={"center"}>
              <ListItem mr={3}>
                <Link
                  href="https://www.facebook.com/edgar.marcanosantodomingo"
                  target={"_blank"}
                  rel="noreferrer"
                  isExternal
                >
                  <Button
                    color={"brand.600"}
                    as={"span"}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    <FacebookIcon boxSize={points11} />
                  </Button>
                </Link>
              </ListItem>
              <ListItem mx={3}>
                <Link
                  href="https://www.instagram.com/p/CYcsvrVgEC5/?utm_medium=share_sheet"
                  target={"_blank"}
                  rel="noreferrer"
                  isExternal
                >
                  <Button
                    color={"brand.600"}
                    as={"span"}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    <InstagramIcon boxSize={points11} />
                  </Button>
                </Link>
              </ListItem>
              <ListItem ml={3}>
                <Link
                  href="https://twitter.com/edgarspendulum?t=PmWj-xl1JJ407GU2Lk8wDg&s=09"
                  target={"_blank"}
                  rel="noreferrer"
                  isExternal
                >
                  <Button
                    color={"brand.600"}
                    as={"span"}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    <TwitterIcon boxSize={points11} />
                  </Button>
                </Link>
              </ListItem>
            </List>
          </VStack>
        </GridItem>
        <GridItem colSpan={points7}>
          <Stack
            flexDirection={content3}
            justifyContent="space-evenly"
            alignItems={"center"}
            spacing={0}
          >
            <List px={points14} py={5} w="full" spacing={1}>
              <Heading
                color={"brand.600"}
                size={"md"}
                textTransform={"uppercase"}
              >
                Información
              </Heading>
              <ListItem>
                <Text color={"brand.600"}>Tel +1 9735108452</Text>
              </ListItem>
              <ListItem>
                <Text color={"brand.600"}> Location New Jersey, USA</Text>
              </ListItem>
            </List>
            <List px={points14} py={5} w="full" spacing={1}>
              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/"}
                  name={"Home"}
                />
              </ListItem>
              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/user/selling"}
                  name={"Quieres vender"}
                />
              </ListItem>
              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/user/list"}
                  name={"Mis ventas"}
                />
              </ListItem>
              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/product"}
                  name={"Productos"}
                />
              </ListItem>
              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/search"}
                  name={"Shop All"}
                />
              </ListItem>
              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/blog"}
                  as={"/blog"}
                  name={"Blog"}
                />
              </ListItem>
            </List>
          </Stack>
        </GridItem>
        <GridItem colSpan={points9}>
          <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        </GridItem>
        <GridItem colSpan={points10} columnGap={50}>
          <HStack justifyContent={content1} spacing={3} w={"full"}>
            <Heading color={"brand.600"} size="sm" mx={2}>
              Idioma
            </Heading>{" "}
            <Select mx={2} placeholder="English" size="xs" w={porcent2}>
              <option value="option1">Español</option>
            </Select>
          </HStack>
        </GridItem>
        <GridItem colSpan={points5}>
          <List
            display="flex"
            justifyContent={content2}
            flexDirection={content3}
            w={"full"}
            px={points14}
          >
            <ListItem mx={2}>
              <MenuHistory color={"brand.600"} />
            </ListItem>
            <ListItem mx={2}>
              <MenuCategoria />
            </ListItem>
          </List>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Footer;
