import React, { useEffect, useRef } from "react";

import Proptypes from "prop-types";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

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

import DialogProduct from "./DialogProduct";

import {
  addDataUser,
  dataActive,
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

const ProductDialogModal = ({ modality, setModality, word, data }) => {
  // dispatch
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(dataActive(values));
  }, [dispatch, dataActive, values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur) {
      return null;
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
              <DialogProduct
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
                handleSubmit={handleSubmit}
              />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

ProductDialogModal.proptypes = {
  word: Proptypes.string.isRequired,
  modality: Proptypes.func.isRequired,
  setModality: Proptypes.func.isRequired,
};

export default ProductDialogModal;
