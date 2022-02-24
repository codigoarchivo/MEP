import React, { useRef } from "react";

import Swal from "sweetalert2";

import Proptypes from "prop-types";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { CloseButton, Heading, HStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import { dataCategory } from "../../data/store";

import DialogProduct from "./DialogProduct";

import {
  addDataUser,
  closeActive,
  deleteDataUser,
  editDataUser,
} from "../../actions/product";

const initialStates = {
  id: "",
  nombre: "",
  precio: "",
  image: "",
  uid: "",
  descripcion: "",
  category: "",
  cantidad: "",
  detalles: "",
};

const ProductDialogModal = ({ dataId }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // file
  const file = useRef();
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();

  // useForm
  const {
    values,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    reset,
  } = useForm(initialStates, dataId);

  console.log(values);

  // validar
  const { fiel, ErrorRetur } = Validator(values);

  // values
  const { nombre, precio, descripcion, category, cantidad, detalles } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorRetur) {
      return Swal.fire("Error", fiel, "error");
    } else {
      dispatch(addDataUser(values));
      dispatch(editDataUser(values));
      dispatch(deleteDataUser(values.id));
    }

    onClose();
  };
  // cerrar
  const onClose = () => {
    router.push("/product");
    dispatch(closeActive());
    reset();
  };

  return (
    <>
      <HStack spacing={5} w={"full"}>
        <CloseButton size="md" onClick={onClose} />
        <Heading as="h1" size={"md"} textTransform={"uppercase"}>
          {values.word}
        </Heading>
      </HStack>
      <DialogProduct
        nombre={nombre}
        precio={precio}
        descripcion={descripcion}
        category={category}
        cantidad={cantidad}
        detalles={detalles}
        HStack={HStack}
        file={file}
        repeat1={repeat1}
        points1={points1}
        points3={points3}
        onClose={onClose}
        dataCategory={dataCategory}
        handleInputChange={handleInputChange}
        handleInputChange2={handleInputChange2}
        handleInputChange3={handleInputChange3}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

ProductDialogModal.proptypes = {
  word: Proptypes.string.isRequired,
  modality: Proptypes.func.isRequired,
};

export default ProductDialogModal;
