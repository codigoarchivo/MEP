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
import { ModeColor } from "../../helpers/ModeColor";

export const SerchCategory = ({ locale, en, es }) => {
  // selector
  const { listData = [] } = useSelector(({ listca }) => listca);
  // Breakpoints
  const { bordes } = Breakpoints();

  const { modelC } = ModeColor();
  return (
    <Stack w={"full"} spacing={"5"} border={bordes} rounded="md" p={4}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"sm"} textTransform={"uppercase"} fontWeight={"normal"}>
          {locale === "en-US" ? en.search.sB : es.search.sB}
        </Heading>
      </Box>
      <List spacing={3}>
        {listData.map(({ na, id }) => (
          <ListItem key={id}>
            <ListIcon as={CheckCircleIcon} color={modelC} />
            <NavLink
              href={{
                pathname: "/search",
                query: { n: id, c: locale === "en-US" ? na.en : na.es },
              }}
              name={locale === "en-US" ? na.en : na.es}
              variant={"tertiary"}
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
