import React, { useEffect } from "react";

import Swal from "sweetalert2";

import Proptypes from "prop-types";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { CloseButton, Heading, HStack, VStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import ProductForm from "./CategoryForm";

import CategoryDelete from "./CategoryDelete";

import {
  activeCategory,
  addCategory,
  closeCategory,
  deleteCategory,
  editCategory,
} from "../../actions/category";

const CategoryData = ({ activeSelect }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();
  // useForm
  const { values, handleInputChange } = useForm(activeSelect);
  // validar
  const { fiel, ErrorCatData } = Validator(values);
  // values
  const { na, id, word } = values;

  useEffect(() => {
    dispatch(
      activeCategory({
        ...activeSelect,
        na,
      })
    );
  }, [dispatch, na]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorCatData) {
      return Swal.fire("Error", fiel, "error");
    } else {
      word === "Add" && dispatch(addCategory(na));
      word === "Edit" && dispatch(editCategory({ na, id }));
      word === "Delete" && dispatch(deleteCategory(id));
      onClose();
    }
  };
  // cerrar
  const onClose = () => {
    router.push("/category");
    dispatch(closeCategory());
  };

  return (
    <>
      <HStack spacing={5} w={"full"}>
        <CloseButton size="md" onClick={onClose} />
        <Heading as="h1" size={"md"} textTransform={"uppercase"}>
          {word}
        </Heading>
      </HStack>
      {word === "Delete" ? (
        <CategoryDelete
          word={word}
          HStack={HStack}
          VStack={VStack}
          onClose={onClose}
          handleSubmit={handleSubmit}
        />
      ) : (
        <ProductForm
          na={na}
          word={word}
          HStack={HStack}
          VStack={VStack}
          onClose={onClose}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
};

CategoryData.proptypes = {
  activeSelect: Proptypes.object.isRequired,
};

export default CategoryData;
