import React from "react";

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

import { addCategory, closeCategory } from "../../actions/category";

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
  const { na, pid, word } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorCatData) {
      return Swal.fire("Error", fiel, "error");
    } else {
      word === "Add" && dispatch(addCategory(na));
      word === "Edit" && dispatch(editDataUser({ na, pid }));
      word === "Delete" && dispatch(deleteDataUser(pid));
    }
    onClose();
  };
  // cerrar
  const onClose = () => {
    dispatch(closeCategory());
    router.push("/category");
  };

  return (
    <>
      <HStack spacing={5} w={"full"}>
        <CloseButton size="md" onClick={onClose} />
        <Heading as="h1" size={"md"} textTransform={"uppercase"}>
          {word}
        </Heading>
      </HStack>
      {values.word === "Delete" ? (
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
