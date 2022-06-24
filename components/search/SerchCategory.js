import React from "react";

import { useDispatch, useSelector } from "react-redux";

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

import { serchProductList } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import { dbProducts } from "../../data/dbProducts";

import Toast from "../../helpers/Toast";

const SerchCategory = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list = [] } = useSelector(({ category }) => category);
  // Breakpoints
  const { bordes } = Breakpoints();

  const handleOnclick = async (id) => {
    const newData = await dbProducts(id, "dbProSeven");

    if (newData.length === 0) {
      return Toast(
        "No hay resultados, reinicia con boton Shop All",
        "info",
        5000
      );
    }

    dispatch(serchProductList(newData));
  };

  return (
    <Stack w={"full"} spacing={"10"} border={bordes} rounded="md" p={5}>
      <Box borderBottom={bordes} py={5} w={"full"}>
        <Heading size={"md"} textTransform={"uppercase"} fontWeight={"normal"}>
          Todas las categorias
        </Heading>
      </Box>
      <List spacing={3}>
        {list.map((item) => (
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
