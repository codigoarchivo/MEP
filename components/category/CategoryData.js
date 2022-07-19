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

import { dbCategoryValid } from "../../data/dbCategory";

const initialStates = {
  na: "",
  pid: "",
  cre: "",
};

const CategoryData = ({ back, category, pid, es, en, locale }) => {
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes } = Breakpoints();

  // useForm
  const { values, reset, handleInputChange } = useFormAll(
    initialStates,
    pid !== "Add" ? category : {}
  );
  // validar
  const { ErrorCatData } = Validator(values);
  // values
  const { na, id, cre } = values;

  cre = Date.now();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let err = locale === "en" ? en.error : es.error;

    if (ErrorCatData) {
      return Toast(locale === "en" ? en.check : es.check, "error", 5000);
    }

    if (pid === "Add") {
      const { r } = await dbCategoryValid(na, "dbCatTwo");

      if (r > 0) {
        return Toast(
          locale === "en" ? en.category.cD : es.category.cD,
          "error",
          5000
        );
      }

      dispatch(addCategory(na, cre, err));
    }

    pid === "Edit" && dispatch(editCategory(na, cre, id, err));
    pid === "Delete" && dispatch(deleteCategory(id, err));
    
    reset();
    back();
    Toast(locale === "en" ? en.save : es.save, "success", 5000);
  };

  // cerrar
  const onClose = () => {
    back();
  };

  let info = "";
  switch (pid) {
    case "Add":
      info = locale === "en" ? en.add : es.add;
      break;
    case "Edit":
      info = locale === "en" ? en.edit : es.edit;
      break;
    case "Delete":
      info = locale === "en" ? en.delete : es.delete;
      break;
  }

  return (
    <>
      <VStack
        backgroundColor={"#fff"}
        spacing={5}
        w={"full"}
        border={bordes}
        p={3}
      >
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {info}
          </Heading>
        </HStack>

        {pid === "Delete" ? (
          <CategoryFormWord
            info={info}
            HStack={HStack}
            VStack={VStack}
            onClose={onClose}
            handleSubmit={handleSubmit}
            locale={locale}
            es={es}
            en={en}
          />
        ) : (
          <CategoryForm
            na={na}
            info={info}
            HStack={HStack}
            VStack={VStack}
            onClose={onClose}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            locale={locale}
            es={es}
            en={en}
          />
        )}
      </VStack>
    </>
  );
};

CategoryData.propTypes = {
  category: PropTypes.object.isRequired,
  pid: PropTypes.string.isRequired,
  es: PropTypes.object,
  en: PropTypes.object,
  locale: PropTypes.string,
};

export default CategoryData;
