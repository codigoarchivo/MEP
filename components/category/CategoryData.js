import React from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import {
  CloseButton,
  Heading,
  HStack,
  VStack,
  Button,
  Stack,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";
import { Toast } from "../../helpers/Toast";
import { Validator } from "../../helpers/Validator";

import { CategoryForm } from "./CategoryForm";
import { CategoryFormWord } from "./CategoryFormWord";

import {
  addCategory,
  deleteCategory,
  editCategory,
} from "../../actions/category";

import { useFormAll } from "../../hooks/useFormAll";

import { dbCategoryValid } from "../../data/dbCategory";

import { enActive, esActive } from "../../actions/ui";

import { ModeColor } from "../../helpers/ModeColor";

const initialStates = {
  na: {
    en: "",
    es: "",
  },
  cre: "",
};

export const CategoryData = ({ back, category, pid, es, en, locale }) => {
  // selector
  const { change } = useSelector(({ ui }) => ui);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes } = Breakpoints();

  // useForm
  const { values, reset, handleInputChangeEnEs } = useFormAll(
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

    let err = locale === "en-US" ? en.error : es.error;

    if (ErrorCatData) {
      return Toast(locale === "en-US" ? en.check : es.check, "error", 5000);
    }

    if (pid === "Add") {
      const { r } = await dbCategoryValid(na, "dbCatTwo");

      if (r > 0) {
        return Toast(
          locale === "en-US" ? en.category.cD : es.category.cD,
          "error",
          5000
        );
      }

      dispatch(addCategory(na, cre, err));
    }

    pid === "Edit" && dispatch(editCategory(na, cre, id, err));
    pid === "Delete" && dispatch(deleteCategory(id, err));

    reset();
    Toast(locale === "en-US" ? en.save : es.save, "success", 5000);
    dispatch(enActive());
  };

  // cerrar
  const onClose = () => {
    back();
    dispatch(enActive());
  };

  let info = "";
  switch (pid) {
    case "Add":
      info = change === false ? en.add : es.add;
      break;
    case "Edit":
      info = change === false ? en.edit : es.edit;
      break;
    case "Delete":
      info = change === false ? en.delete : es.delete;
      break;
  }

  const enRes = () => {
    dispatch(enActive());
  };
  const esRes = () => {
    dispatch(esActive());
  };

  const { modelC, modelF } = ModeColor();

  return (
    <>
      <VStack spacing={5} w={"full"} border={bordes} p={{ base: 0, md: 3 }}>
        <Stack
          flexDirection={"row"}
          w={"full"}
          justifyContent={"space-between"}
        >
          <HStack>
            <CloseButton
              color={modelC}
              display={"inline"}
              size="md"
              onClick={onClose}
            />
            <Heading
              display={"inline"}
              as="h1"
              size={"md"}
              textTransform={"uppercase"}
            >
              {info}
            </Heading>
          </HStack>

          <HStack>
            <Button
              color={change === false ? "brand.700" : modelF}
              variant={"tertiary"}
              onClick={enRes}
            >
              en
            </Button>
            <Button
              color={change === true ? "brand.700" : modelF}
              variant={"tertiary"}
              onClick={esRes}
            >
              es
            </Button>
          </HStack>
        </Stack>

        {pid === "Delete" ? (
          <CategoryFormWord
            change={change}
            info={info}
            HStack={HStack}
            VStack={VStack}
            onClose={onClose}
            handleSubmit={handleSubmit}
            es={es}
            en={en}
          />
        ) : (
          <CategoryForm
            na={change === false ? na.en : na.es}
            info={info}
            HStack={HStack}
            VStack={VStack}
            onClose={onClose}
            handleSubmit={handleSubmit}
            handleInputChangeEnEs={handleInputChangeEnEs}
            change={change}
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
