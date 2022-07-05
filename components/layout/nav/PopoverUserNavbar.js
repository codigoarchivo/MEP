import React from "react";

import { useSelector } from "react-redux";

import { Box, Divider, List, ListItem, chakra } from "@chakra-ui/react";

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

const PopoverUserNavbar = ({
  HStack,
  Heading,
  NavLink,
  bg2,
  Button,
  handleLogout,
  es,
  en,
  locale,
  locales,
  asPath,
}) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);

  return (
    <>
      <List spacing={3} py={5}>
        <ListItem>
          <NavLink
            leftIcon={<Home />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/"}
            name={locale === "en" ? en.major.mA : es.major.mA}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <NavLink
            leftIcon={<Perfil />}
            href={"/user"}
            fontWeight={"normal"}
            variant={"secondary"}
            name={locale === "en" ? en.major.mD : es.major.mD}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />

        <ListItem>
          <NavLink
            leftIcon={<ListEspera />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/blog"}
            name={locale === "en" ? en.major.mE : es.major.mE}
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
                name={locale === "en" ? en.major.mF : es.major.mF}
              />
            </ListItem>
            <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
            <ListItem>
              <NavLink
                leftIcon={<VentasClient />}
                fontWeight={"normal"}
                variant={"secondary"}
                href={"/admin"}
                name={locale === "en" ? en.major.mH : es.major.mH}
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
            name={locale === "en" ? en.major.mG : es.major.mG}
          />
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
        <ListItem>
          <NavLink
            leftIcon={<ShopAll />}
            fontWeight={"normal"}
            variant={"secondary"}
            href={"/search"}
            name={locale === "en" ? en.major.mI : es.major.mI}
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
            {locale === "en" ? en.logout : es.logout}
          </Button>
        </ListItem>
        <Divider orientation="horizontal" variant={"dashed"} bg={bg2} />
      </List>

      <HStack w={"full"} alignItems={"center"} py={5}>
        <Heading textTransform={"uppercase"} size="sm">
          <Box w={6} h={6} as={Global} />{" "}
          {locale === "en" ? en.language : es.language}
        </Heading>

        {locales.map((lo, i) => (
          <chakra.li key={i} sx={{ listStyle: "none" }}>
            <NavLink
              size={"sm"}
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
    </>
  );
};

export default PopoverUserNavbar;
