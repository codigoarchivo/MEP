import React, { useEffect } from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";

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
  Stack,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";

import ModeColor from "../../../helpers/ModeColor";
import Breakpoints from "../../../helpers/Breakpoints";

import NavLink from "../../../utils/Navlink";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../../helpers/IconNew";

import MenuHistory from "../../../utils/MenuHistory";

import MenuCategoria from "../../../utils/MenuCategoria";

import { listTraslate } from "../../../actions/translate";

const Footer = () => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { t } = useSelector(({ translate }) => translate);
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale, locales, asPath } = useRouter();
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
    points14,
    content1,
    content2,
    content3,
    bordes,
  } = Breakpoints();
  // mode Color
  const { bg2 } = ModeColor();
  // translate
  const data = `/translations/${locale}/global.json`;
  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then((t) => dispatch(listTraslate(t)));
  }, [dispatch, data]);

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
            <Text
              fontSize={"sm"}
              color={"brand.600"}
              textTransform={"capitalize"}
            >
              © {new Date().getFullYear()} {t.footer.fA}
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
                {t.footer.fB}
              </Heading>
              <ListItem>
                <Text color={"brand.600"}>Tel +1 9735108452</Text>
              </ListItem>
              <ListItem>
                <Text color={"brand.600"}> {t.footer.fC}</Text>
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
                  name={t.major.mA}
                />
              </ListItem>
              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/user"}
                  name={t.major.mD}
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
                  name={t.major.mE}
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
                  name={t.major.mG}
                />
              </ListItem>
              {a?.rol === "owner" && (
                <>
                  <ListItem>
                    <NavLink
                      display={"inline"}
                      color={"brand.600"}
                      size="sm"
                      px={0}
                      variant={"secondary"}
                      href={"/admin/category"}
                      name={t.major.mF}
                    />
                  </ListItem>
                  <ListItem>
                    <NavLink
                      display={"inline"}
                      color={"brand.600"}
                      size="sm"
                      px={0}
                      variant={"secondary"}
                      href={"/admin"}
                      name={t.major.mH}
                    />
                  </ListItem>
                </>
              )}

              <ListItem>
                <NavLink
                  display={"inline"}
                  color={"brand.600"}
                  size="sm"
                  px={0}
                  variant={"secondary"}
                  href={"/search"}
                  name={t.major.mI}
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
              {t.language}
            </Heading>{" "}
            {locales.map((lo, i) => (
              <chakra.li key={i} sx={{ listStyle: "none" }}>
                <NavLink
                  variant={"primary"}
                  href={asPath}
                  locale={lo}
                  name={lo}
                  px={0}
                  w={0}
                />
              </chakra.li>
            ))}
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
              <MenuHistory
                buys={t.major.mB}
                sales={t.major.mC}
                history={t.history}
                color={"brand.600"}
              />
            </ListItem>
            <ListItem mx={2}>
              <MenuCategoria categories={t.categories} />
            </ListItem>
          </List>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Footer;
