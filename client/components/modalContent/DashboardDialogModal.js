import React, { useRef } from "react";

import Proptypes from "prop-types";

import { useRouter } from "next/router";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import ModeColor from "../../helpers/ModeColor";
import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import { dataCategory } from "../../data/store";

import { DialogForm } from "./DialogForm";
import { DialogCategory } from "./DialogCategory";

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

export const DashboardDialogModal = ({ modality, setModality, word, data }) => {
  // router
  const router = useRouter();
  // file
  const file = useRef();
  // ref
  const cancelRef = useRef();
  // Breakpoints
  const { points1, repeat1, points3 } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();

  // guardar states
  const dataInitial = { ...initialStates, ...data };

  const {
    values,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    reset,
    imgenM,
    setImgenM,
  } = useForm(dataInitial);

  // validar
  const {
    mNombre,
    mPrecio,
    mDetalles,
    mDescripcion,
    mCantidad,
    mCategory,
    fiel,
    fileE,
    ErrorRetur,
  } = Validator(values);

  // values
  const { nombre, precio, descripcion, category, cantidad, detalles } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur) {
      return null;
    } else {
      console.log("hola");
    }

    onClose();
  };
  // cerrar
  const onClose = () => {
    data.category === "category" && router.push("/category");
    data.product === "product" && router.push("/product");
    setModality(false);
    setImgenM(false);
    reset();
  };

  return (
    <>
      <AlertDialog
        isOpen={modality}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <HStack spacing={5}>
                <CloseButton size="md" onClick={onClose} />
                <Heading as="h1" size={"md"} textTransform={"uppercase"}>
                  {word}
                </Heading>
              </HStack>
            </AlertDialogHeader>
            <AlertDialogBody>
              {data.category === "category" && (
                <DialogCategory
                  VStack={VStack}
                  onClose={onClose}
                  nombre={nombre}
                  mNombre={mNombre}
                  repeat1={repeat1}
                  points3={points3}
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                  fiel={fiel}
                  Grid={Grid}
                  GridItem={GridItem}
                  FormControl={FormControl}
                  FormErrorMessage={FormErrorMessage}
                  FormLabel={FormLabel}
                  Button={Button}
                  Input={Input}
                  AlertDialogFooter={AlertDialogFooter}
                  cancelRef={cancelRef}
                  dataCategory={dataCategory}
                />
              )}
              {data.product === "product" && (
                <DialogForm
                  bg={bg}
                  Box={Box}
                  fiel={fiel}
                  Grid={Grid}
                  file={file}
                  Input={Input}
                  fileE={fileE}
                  VStack={VStack}
                  Button={Button}
                  imgenM={imgenM}
                  repeat1={repeat1}
                  points1={points1}
                  points3={points3}
                  onClose={onClose}
                  brand={brand}
                  nombre={nombre}
                  mNombre={mNombre}
                  cantidad={cantidad}
                  mCantidad={mCantidad}
                  descripcion={descripcion}
                  mDescripcion={mDescripcion}
                  category={category}
                  mCategory={mCategory}
                  precio={precio}
                  mPrecio={mPrecio}
                  detalles={detalles}
                  mDetalles={mDetalles}
                  handleSubmit={handleSubmit}
                  GridItem={GridItem}
                  FormControl={FormControl}
                  FormLabel={FormLabel}
                  InputGroup={InputGroup}
                  cancelRef={cancelRef}
                  dataCategory={dataCategory}
                  AlertDialogFooter={AlertDialogFooter}
                  FormErrorMessage={FormErrorMessage}
                  handleInputChange={handleInputChange}
                  handleInputChange2={handleInputChange2}
                  handleInputChange3={handleInputChange3}
                />
              )}
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

DashboardDialogModal.proptypes = {
  word: Proptypes.string.isRequired,
  modality: Proptypes.func.isRequired,
  setModality: Proptypes.func.isRequired,
};
