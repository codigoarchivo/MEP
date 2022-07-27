import React from "react";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";

import { NavLink } from "../../utils/Navlink";

import { Breakpoints } from "../../helpers/Breakpoints";

export const SerchCategory = ({ locale, en, es }) => {
  // selector
  const { listData = [] } = useSelector(({ listca }) => listca);
  // Breakpoints
  const { bordes } = Breakpoints();

  return (
    <Stack w={"full"} spacing={"5"} border={bordes} rounded="md" p={4}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"sm"} textTransform={"uppercase"} fontWeight={"normal"}>
          {locale === "en" ? en.search.sB : es.search.sB}
        </Heading>
      </Box>
      <List spacing={3}>
        {listData.map(({ na, id }) => (
          <ListItem key={id}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            <NavLink
              href={{
                pathname: "/search",
                query: { n: id, c: locale === "en" ? na.en : na.es },
              }}
              name={locale === "en" ? na.en : na.es}
              variant={"secondary"}
              fontWeight={"normal"}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

SerchCategory.propTypes = {
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
