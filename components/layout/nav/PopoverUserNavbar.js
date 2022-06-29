import React, { useEffect } from "react";

import { Box, Divider, List, ListItem, chakra } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  Category,
  Global,
  Home,
  ListEspera,
  Logout,
  Perfil,
  Product,
  ShopAll,
  VentasClient,
} from "../../../helpers/IconNew";

import { listTraslate } from "../../../actions/translate";

const PopoverUserNavbar = ({
  HStack,
  Heading,
  NavLink,
  bg2,
  Button,
  handleLogout,
}) => {
  // useDispatch
  const dispatch = useDispatch();
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { t } = useSelector(({ translate }) => translate);
  // useRouter
  const { locale, locales, asPath } = useRouter();

  // translate
  const data = `/translations/${locale}/global.json`;
  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then((t) => dispatch(listTraslate(t)));
  }, [dispatch, data]);

  return (
    <>
      <List spacing={3} py={5}>
        <ListItem>
          <NavLink
            leftIcon={<Home />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/"}
            name={t.major.mA}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <NavLink
            leftIcon={<Perfil />}
            href={"/user"}
            fontWeight={"normal"}
            variant={"secondary"}
            name={t.major.mD}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />

        <ListItem>
          <NavLink
            leftIcon={<ListEspera />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/blog"}
            name={t.major.mE}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        {a?.rol === "owner" && (
          <>
            <ListItem>
              <NavLink
                leftIcon={<Category />}
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/admin/category"}
                name={t.major.mF}
              />
            </ListItem>
            <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
            <ListItem>
              <NavLink
                leftIcon={<VentasClient />}
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/admin"}
                name={t.major.mH}
              />
            </ListItem>
            <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
          </>
        )}
        <ListItem>
          <NavLink
            leftIcon={<Product />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={`/product/[uid]`}
            as={`/product/${a?.uid}`}
            name={t.major.mG}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <NavLink
            leftIcon={<ShopAll />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/search"}
            name={t.major.mI}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <Button
            variant={"secondary"}
            fontWeight={"normal"}
            leftIcon={<Logout />}
            onClick={handleLogout}
          >
            {t.Logout}
          </Button>
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <HStack w={"full"} alignItems={"center"} py={5}>
            <Box w={6} h={6} as={Global} />

            <Heading textTransform={"uppercase"} size="sm">
              {t.language}
            </Heading>

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
        </ListItem>
      </List>
    </>
  );
};

export default PopoverUserNavbar;
