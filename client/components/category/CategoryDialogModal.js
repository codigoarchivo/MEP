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
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import { dataCategory } from "../../data/store";

import DialogCategory from "./DialogCategory";

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

const CategoryDialogModal = ({ modality, setModality, word, data }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // file
  const file = useRef();
  // ref
  const cancelRef = useRef();
  // Breakpoints
  const { repeat1, points3 } = Breakpoints();

  // guardar states
  const dataInitial = { ...initialStates, ...data };

  const { values, handleInputChange, reset, setImgenM } = useForm(dataInitial);

  // validar
  const { mNombre, fiel, ErrorRetur } = Validator(values);

  // values
  const { nombre } = values;

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
    router.push("/category");
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
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

CategoryDialogModal.proptypes = {
  word: Proptypes.string.isRequired,
  modality: Proptypes.func.isRequired,
  setModality: Proptypes.func.isRequired,
};

export default CategoryDialogModal;
