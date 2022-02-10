import React from "react";

import {
  Box,
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
    content1,
  } = Breakpoints();
  // mode Color
  const { bg2 } = ModeColor();

  return (
    <Box as={"form"} w={"full"}>
      <Container maxW={"container.lg"} px={5} py={{ base: "10", md: "16" }}>
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
                <Icon boxSize={{ base: "6", md: "8" }} cursor={"pointer"}>
                  <FacebookIcon />
                </Icon>
              </ListItem>
              <ListItem mx={2}>
                <Icon boxSize={{ base: "6", md: "8" }} cursor={"pointer"}>
                  <TelegramIcon />
                </Icon>
              </ListItem>
              <ListItem mx={2}>
                <Icon boxSize={{ base: "6", md: "8" }} cursor={"pointer"}>
                  <InstagramIcon />
                </Icon>
              </ListItem>
              <ListItem ml={2}>
                <Icon boxSize={{ base: "6", md: "8" }} cursor={"pointer"}>
                  <TwitterIcon />
                </Icon>
              </ListItem>
            </List>
          </GridItem>
          <GridItem colSpan={points7}>
            <Stack
              flexDirection={{ base: "column", sm: "row" }}
              justifyContent="space-evenly"
              alignItems={"center"}
              spacing={0}
            >
              <List p={5} w="full">
                <ListItem>Edgars Pendulum &copy;</ListItem>
                <ListItem>Assumenda</ListItem>
                <ListItem>Quidem</ListItem>
                <ListItem>Quidem</ListItem>
              </List>
              <List p={5} w="full">
                <ListItem>Edgars Pendulum &copy;</ListItem>
                <ListItem>Assumenda</ListItem>
                <ListItem>Quidem</ListItem>
                <ListItem>Quidem</ListItem>
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
              justifyContent={{ base: "start", lg: "end" }}
              flexDirection={{ base: "column", sm: "row" }}
              w={"full"}
            >
              <ListItem mx={2}>Edgars Pendulum &copy;</ListItem>
              <ListItem mx={2}>Assumenda</ListItem>
              <ListItem mx={2}>Quidem</ListItem>
              <ListItem mx={2}>Quidem</ListItem>
            </List>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
