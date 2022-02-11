import React from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  List,
  ListItem,
  Select,
  Stack,
} from "@chakra-ui/react";

import ModeColor from "../../../helpers/ModeColor";
import Breakpoints from "../../../helpers/Breakpoints";
import NavLink from "../../../helpers/Navlink";

import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
} from "../../../helpers/IconNew";

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
  } = Breakpoints();
  // mode Color
  const { bg2 } = ModeColor();

  return (
    <Box as={"form"} w={"full"}>
      <Container maxW={"container.lg"} px={5} py={points12}>
        <Grid
          templateColumns={repeat2}
          columnGap={points3}
          gridAutoRows={"minmax(50px, auto)"}
          gap={4}
          alignItems={"center"}
        >
          <GridItem colSpan={points8}>
            <List display="flex" alignItems={"center"} p={5}>
              <ListItem mr={2}>
                <Button size="xs" px={0} variant={"secondary"}>
                  <FacebookIcon boxSize={points11} />
                </Button>
              </ListItem>
              <ListItem mx={2}>
                <Button size="xs" px={0} variant={"secondary"}>
                  <TelegramIcon boxSize={points11} />
                </Button>
              </ListItem>
              <ListItem mx={2}>
                <Button size="xs" px={0} variant={"secondary"}>
                  <InstagramIcon boxSize={points11} />
                </Button>
              </ListItem>
              <ListItem ml={2}>
                <Button size="xs" px={0} variant={"secondary"}>
                  <TwitterIcon boxSize={points11} />
                </Button>
              </ListItem>
            </List>
          </GridItem>
          <GridItem colSpan={points7}>
            <Stack
              flexDirection={content3}
              justifyContent="space-evenly"
              alignItems={"center"}
              spacing={0}
            >
              <List px={points14} py={5} w="full" spacing={1}>
                <Heading size={"md"} textTransform={"uppercase"}>
                  Home
                </Heading>
                <ListItem>
                  <Button size="sm" px={0} variant={"secondary"}>
                    <NavLink href={"/"} name={`Edgars Pendulum`} />
                  </Button>
                </ListItem>
                <ListItem>
                  <Button size="sm" px={0} variant={"secondary"}>
                    <NavLink href={"/"} name={`Edgars Pendulum`} />
                  </Button>
                </ListItem>
                <ListItem>
                  <Button size="sm" px={0} variant={"secondary"}>
                    <NavLink href={"/"} name={`Edgars Pendulum`} />
                  </Button>
                </ListItem>
              </List>
              <List px={points14} py={5} w="full" spacing={1}>
                <Heading size={"md"} textTransform={"uppercase"}>
                  Home
                </Heading>
                <ListItem>
                  <Button size="sm" px={0} variant={"secondary"}>
                    <NavLink href={"/"} name={`Edgars Pendulum`} />
                  </Button>
                </ListItem>
                <ListItem>
                  <Button size="sm" px={0} variant={"secondary"}>
                    <NavLink href={"/"} name={`Edgars Pendulum`} />
                  </Button>
                </ListItem>
                <ListItem>
                  <Button size="sm" px={0} variant={"secondary"}>
                    <NavLink href={"/"} name={`Edgars Pendulum`} />
                  </Button>
                </ListItem>
              </List>
            </Stack>
          </GridItem>
          <GridItem colSpan={points9}>
            <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
          </GridItem>
          <GridItem colSpan={points10} columnGap={50}>
            <HStack justifyContent={content1} spacing={3} w={"full"}>
              <Heading size="sm" mx={2}>
                Idioma
              </Heading>{" "}
              <Select
                mx={2}
                placeholder="English"
                size="xs"
                w={{ base: "40%", md: "15%", lg: "35%" }}
              >
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
            >
              <ListItem mx={2}>
                <Button size="sm" px={0} variant={"secondary"}>
                  <NavLink href={"/"} name={`Edgars Pendulum`} />
                </Button>
              </ListItem>
              <ListItem mx={2}>
                <Button size="sm" px={0} variant={"secondary"}>
                  <NavLink href={"/"} name={`Edgars Pendulum`} />
                </Button>
              </ListItem>
              <ListItem mx={2}>
                <Button size="sm" px={0} variant={"secondary"}>
                  <NavLink href={"/"} name={`Edgars Pendulum`} />
                </Button>
              </ListItem>
              <ListItem mx={2}>
                <Button size="sm" px={0} variant={"secondary"}>
                  <NavLink href={"/"} name={`Edgars Pendulum`} />
                </Button>
              </ListItem>
            </List>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
