import React from "react";

import Swal from "sweetalert2";

import Proptypes from "prop-types";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { CloseButton, Heading, HStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import ProductForm from "./CategoryForm";

import ProductDetails from "./CategoryDetails";

import { closeCategory } from "../../actions/category";

const initialStates = {
  name: "",
};

const CategoryData = ({ activeSelect }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();
  // useForm
  const { values, handleInputChange } = useForm({
    ...initialStates,
    ...activeSelect,
  });
  // validar
  const { fiel, ErrorRetur } = Validator(values);

  // values
  const { name } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorRetur) {
      return Swal.fire("Error", fiel, "error");
    } else {
      word === "Add" && dispatch(addDataUser(values));
      word === "Edit" && dispatch(editDataUser(values));
      word === "Delete" && dispatch(deleteDataUser(values.id));
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
          {values.word}
        </Heading>
      </HStack>
      {values.word === "Delete" ? (
        <ProductDetails
          handleSubmit={handleSubmit}
          HStack={HStack}
          word={values.word}
          onClose={onClose}
        />
      ) : (
        <ProductForm
          name={name}
          HStack={HStack}
          repeat1={repeat1}
          points1={points1}
          points3={points3}
          onClose={onClose}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
};

CategoryData.proptypes = {
  word: Proptypes.string.isRequired,
  modality: Proptypes.func.isRequired,
};

export default CategoryData;
