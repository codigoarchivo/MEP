import React from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import {
  CloseButton,
  Heading,
  HStack,
  useToast,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import Validator from "../../helpers/Validator";

import CategoryForm from "./CategoryForm";

import CategoryFormWord from "./CategoryFormWord";

import {
  addCategory,
  deleteCategory,
  editCategory,
} from "../../actions/category";

import useFormChange from "../../hooks/useFormChange";

const initialStates = {
  id: "",
  na: "",
  word: "",
};

const CategoryData = () => {
  // toast
  const toast = useToast();
  // selector
  const { list } = useSelector(({ product }) => product);
  // selector
  const { activeSelect } = useSelector(({ category }) => category);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();
  // useForm
  const { values, handleInputChange } = useFormChange(
    initialStates,
    activeSelect
  );
  // validar
  const { fiel, ErrorCatData } = Validator(values);
  // values
  const { na, id, word } = values;

  // match
  const match = list
    .map(({ ct }) => ct.na.toLowerCase().trim())
    .includes(na.toLowerCase().trim());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorCatData) {
      return toast({
        description: fiel,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (match) {
      return toast({
        description: "Categoria ya existe",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    word === "Add" && dispatch(addCategory(na));
    word === "Edit" && dispatch(editCategory(na, id));
    word === "Delete" && dispatch(deleteCategory(id));
    onClose();
  };
  // cerrar
  const onClose = () => {
    router.back();
  };

  return (
    <>
      <VStack spacing={5} w={"full"} border={bordes} p={3}>
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {word}
          </Heading>
        </HStack>

        {word === "Delete" ? (
          <CategoryFormWord
            word={word}
            HStack={HStack}
            VStack={VStack}
            onClose={onClose}
            handleSubmit={handleSubmit}
          />
        ) : (
          <CategoryForm
            na={na}
            word={word}
            HStack={HStack}
            VStack={VStack}
            onClose={onClose}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        )}
      </VStack>
    </>
  );
};

export default CategoryData;
