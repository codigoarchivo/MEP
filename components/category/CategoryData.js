import React from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { CloseButton, Heading, HStack, VStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";
import Validator from "../../helpers/Validator";

import CategoryForm from "./CategoryForm";

import CategoryFormWord from "./CategoryFormWord";

import {
  addCategory,
  deleteCategory,
  editCategory,
} from "../../actions/category";

import useFormAll from "../../hooks/useFormAll";

const initialStates = {
  na: "",
  pid: "",
};

const CategoryData = () => {
  // selector
  const { list } = useSelector(({ category }) => category);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();

  const data = router.query;
  // useForm
  const { values, handleInputChange } = useFormAll(initialStates, data);
  // validar
  const { fiel, ErrorCatData } = Validator(values);
  // values
  const { na, id, pid } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ErrorCatData) {
      return Toast(fiel, "error", 5000);
    }

    if (pid === "Add") {
      const match = list
        .map((item) => item.na.toLowerCase())
        .includes(na.toLowerCase());

      if (match) {
        return Toast(
          "Hay una categoria asociada al nombre quiere agregar",
          "error",
          5000
        );
      } else {
        dispatch(addCategory(na));
      }
    }

    pid === "Edit" && dispatch(editCategory(na, id));
    pid === "Delete" && dispatch(deleteCategory(id));
    onClose();
  };
  // cerrar
  const onClose = () => {
    router.push("/category");
  };

  return (
    <>
      <VStack spacing={5} w={"full"} border={bordes} p={3}>
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {pid}
          </Heading>
        </HStack>

        {pid === "Delete" ? (
          <CategoryFormWord
            pid={pid}
            HStack={HStack}
            VStack={VStack}
            onClose={onClose}
            handleSubmit={handleSubmit}
          />
        ) : (
          <CategoryForm
            na={na}
            pid={pid}
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
