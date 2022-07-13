import React from "react";

import { useSelector } from "react-redux";

import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";

import NavLink from "../../utils/Navlink";

import Breakpoints from "../../helpers/Breakpoints";

import { dbProducts } from "../../data/dbProducts";

const SerchCategory = ({ locale, en, es, setDataAll }) => {
  // selector
  const { listData = [] } = useSelector(({ category }) => category);
  // Breakpoints
  const { bordes } = Breakpoints();

  const handleOnclick = async (id) => {
    const newData = await dbProducts(id, "dbProSeven");

    if (newData.length > 0) {
      setDataAll(newData);
    }
  };

  return (
    <Stack w={"full"} spacing={"5"} border={bordes} rounded="md" p={4}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"sm"} textTransform={"uppercase"} fontWeight={"normal"}>
          {locale === "en" ? en.search.sB : es.search.sB}
        </Heading>
      </Box>
      <List spacing={3}>
        {listData.map((item) => (
          <ListItem key={item.id} onClick={() => handleOnclick(item.id)}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            <NavLink
              href={{
                pathname: "/search",
                query: { n: item.id, c: item.na },
              }}
              name={item.na}
              variant={"secondary"}
              fontWeight={"normal"}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default SerchCategory;
