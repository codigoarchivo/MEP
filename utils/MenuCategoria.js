import React from "react";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";

import NavLink from "../utils/Navlink";

import { useDispatch, useSelector } from "react-redux";

import Breakpoints from "../helpers/Breakpoints";

import { CategoryAll } from "../helpers/IconNew";

import { dbProducts } from "../data/dbProducts";

import Toast from "../helpers/Toast";

import { serchProductList } from "../actions/product";

const MenuCategoria = () => {
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { displayOff2, bordes } = Breakpoints();
  // selector
  const { list = [] } = useSelector(({ category }) => category);

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
    <Menu>
      <MenuButton
        fontSize={["sm"]}
        leftIcon={<CategoryAll />}
        variant={"primary"}
        as={Button}
        textTransform={"uppercase"}
      >
        Categorias
      </MenuButton>
      <Portal>
        <MenuList display={displayOff2} minWidth={0} border={bordes}>
          {list.map(({ na, id }) => (
            <MenuItem key={id} onClick={() => handleOnclick(id)}>
              <NavLink
                href={{
                  pathname: "/search",
                  query: { n: id, c: na },
                }}
                name={na}
                variant={"secondary"}
                fontWeight={"normal"}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default MenuCategoria;
