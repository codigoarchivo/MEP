import React from "react";

import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

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

import { dbCategory } from "../../data/dbCategory";

const initialStates = {
  na: "",
  pid: "",
};

const CategoryData = ({ router, category, pid }) => {
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes } = Breakpoints();

  // useForm
  const { values, handleInputChange } = useFormAll(initialStates, category);
  // validar
  const { fiel, ErrorCatData } = Validator(values);
  // values
  const { na, id } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ErrorCatData) {
      return Toast(fiel, "error", 5000);
    }

    if (pid === "Add") {
      const match = await dbCategory(na, "dbCatThree");

      if (match.length > 0) {
        return Toast(
          "Hay una categoria asociada al nombre quiere agregar",
          "error",
          5000
        );
      }

      dispatch(addCategory(na));
    }

    pid === "Edit" && dispatch(editCategory(na, id));
    pid === "Delete" && dispatch(deleteCategory(id));

    await router.push("/admin/category");
  };

  // cerrar
  const onClose = () => {
    router.push("/admin/category");
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

CategoryData.propTypes = {
  router: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  pid: PropTypes.string.isRequired,
};

export default CategoryData;
