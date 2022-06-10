import React, { useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { CloseButton, Heading, HStack, VStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";
import Validator from "../../helpers/Validator";

import ProductForm from "./ProductForm";

import ProductFormWord from "./ProductFormWord";

import { addProduct, deleteProduct, editProduct } from "../../actions/product";

import useFormAll from "../../hooks/useFormAll";

import ProductFormDetails from "./ProductFormDetails";

const initialStates = {
  pr: 0,
  cn: 0,
  pj: 0,
  ps: "",
  na: "",
  ds: "",
  ct: "",
  dt: "",
  im: "",
};

const ProductData = ({ product = {}, set = "", router = {}, details = "" }) => {
  // useState
  const [word, setWord] = useState("");
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { points1, repeat1, points3, bordes } = Breakpoints();

  const [urlImage, setUrlImage] = useState("");

  useMemo(() => {
    setWord(set);
  }, [setWord, set]);

  // useForm
  const {
    values,
    handleInputChange,
    handleNumberInputCn,
    handleNumberInputPj,
    handleNumberInputPr,
  } = useFormAll(initialStates, word !== "add" ? product : {});

  // agrega imagen
  values.im = urlImage ? urlImage : values.im;

  values.pj = Number(values.pj);
  values.cn = Number(values.cn);
  values.pr = Number(values.pr);
  // validar
  const { fiel, ErrorRetur } = Validator(values);

  // values
  const { na, ds, ct, dt, im, id, ps, pj, cn, pr } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur) {
      return Toast(fiel, "error", 5000);
    }

    if (word === "delete") {
      dispatch(deleteProduct(id));
    }

    if (word === "add") {
      dispatch(
        addProduct({
          na,
          pr,
          ds,
          ct,
          cn,
          dt,
          im,
          ps,
          pj,
          uid: a?.uid,
        })
      );
    }

    if (word === "edit") {
      dispatch(
        editProduct({
          na,
          pr,
          ds,
          ct,
          cn,
          dt,
          im,
          id,
          ps,
          pj,
          uid: a?.uid,
        })
      );
    }

    router.push({
      pathname: `/product`,
      query: {
        uid: a?.uid,
      },
    });
  };

  // cerrar
  const onClose = () => {
    router.push({
      pathname: `/product`,
      query: {
        uid: a?.uid,
      },
    });
  };

  return (
    <>
      <VStack spacing={5} w={"full"} border={bordes} p={6} boxShadow={"xl"}>
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {word}
          </Heading>
        </HStack>

        {(word === "add" || word === "edit") && (
          <ProductForm
            im={im}
            pj={pj}
            cn={cn}
            pr={pr}
            ps={ps}
            na={na}
            ds={ds}
            ct={ct}
            dt={dt}
            word={word}
            HStack={HStack}
            repeat1={repeat1}
            points1={points1}
            points3={points3}
            onClose={onClose}
            handleInputChange={handleInputChange}
            handleNumberInputCn={handleNumberInputCn}
            handleNumberInputPj={handleNumberInputPj}
            handleNumberInputPr={handleNumberInputPr}
            handleSubmit={handleSubmit}
            setUrlImage={setUrlImage}
          />
        )}

        {word === "delete" && (
          <ProductFormWord
            handleSubmit={handleSubmit}
            HStack={HStack}
            word={word}
            onClose={onClose}
          />
        )}

        {word === "details" && <ProductFormDetails dt={details} />}
      </VStack>
    </>
  );
};

ProductData.propTypes = {
  product: PropTypes.object,
  set: PropTypes.string,
  router: PropTypes.object,
  details: PropTypes.string,
};

export default ProductData;
