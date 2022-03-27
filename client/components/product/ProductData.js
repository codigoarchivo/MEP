import React from "react";

import Swal from "sweetalert2";

import Proptypes from "prop-types";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { CloseButton, Heading, HStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import ProductForm from "./ProductForm";

import ProductFormWord from "./ProductFormWord";

import {
  addProduct,
  closeActive,
  deleteProduct,
  editProduct,
} from "../../actions/product";

const initialStates = {
  na: "",
  pr: "",
  ds: "",
  ct: "",
  cn: "",
  dt: "",
  im: "",
};

const ProductData = () => {
  // selector
  const { activeSelect } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();

  // useForm
  const [
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    handleInputChange4,
  ] = useForm(initialStates, activeSelect);
  // agrega imagen
  values.im = urlImage ? urlImage : values.im;
  // validar
  const { fiel, estado, ErrorRetur, ErrorRetur2 } = Validator(values);
  // values
  const { na, pr, ds, ct, cn, dt, im, es, id, word } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur2) {
      return Swal.fire("Error", estado, "error");
    }

    if (ErrorRetur) {
      return Swal.fire("Error", fiel, "error");
    } else {
      word === "Add" &&
        dispatch(addProduct({ na, pr, ds, ct, cn, dt, im, es: true }));
      word === "Edit" &&
        dispatch(editProduct({ na, pr, ds, ct, cn, dt, im, es, id }));
      word === "Delete" && dispatch(deleteProduct(id));
    }

    onClose();
  };
  // cerrar
  const onClose = () => {
    router.push("/product");
    dispatch(closeActive());
  };

  return (
    <>
      <HStack spacing={5} w={"full"}>
        <CloseButton size="md" onClick={onClose} />
        <Heading as="h1" size={"md"} textTransform={"uppercase"}>
          {word}
        </Heading>
      </HStack>
      {word === "Details" || word === "Delete" ? (
        <ProductFormWord
          handleSubmit={handleSubmit}
          HStack={HStack}
          dt={dt}
          word={word}
          onClose={onClose}
        />
      ) : (
        <ProductForm
          word={word}
          na={na}
          pr={pr}
          ds={ds}
          ct={ct}
          cn={cn}
          dt={dt}
          progress={progress}
          HStack={HStack}
          repeat1={repeat1}
          points1={points1}
          points3={points3}
          onClose={onClose}
          handleInputChange={handleInputChange}
          handleInputChange2={handleInputChange2}
          handleInputChange3={handleInputChange3}
          handleInputChange4={handleInputChange4}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

ProductData.proptypes = {
  word: Proptypes.string.isRequired,
  modality: Proptypes.func.isRequired,
};

export default ProductData;
