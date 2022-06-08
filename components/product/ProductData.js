import React, { useMemo, useState } from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { CloseButton, Heading, HStack, VStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";
import Validator from "../../helpers/Validator";

import ProductForm from "./ProductForm";

import ProductFormWord from "./ProductFormWord";

import { deleteProduct, editProduct } from "../../actions/product";

import useFormAll from "../../hooks/useFormAll";

const initialStates = {
  pr: 0,
  cn: 1,
  pj: 0,
  ps: "",
  na: "",
  ds: "",
  ct: "",
  dt: "",
  im: "",
};

const ProductData = ({ product = {} }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);

  const [word, setWord] = useState("");
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { points1, repeat1, points3, bordes } = Breakpoints();

  const [urlImage, setUrlImage] = useState("");

  const data = router.query;

  useMemo(() => {
    setWord(data.set);
  }, [setWord, data.set]);

  // useForm
  const { values, handleInputChange, handleNumberInput } = useFormAll(
    initialStates,
    product
  );

  // agrega imagen
  values.im = urlImage ? urlImage : values.im;
  // validar
  const { fiel, estado, ErrorRetur, ErrorRetur2 } = Validator(values);

  // values
  const { na, ds, ct, dt, im, id, ps } = values;

  const pj = Number(values.pj);
  const cn = Number(values.cn);
  const pr = Number(values.pr);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur2) {
      return Toast(estado, "error", 5000);
    }

    if (ErrorRetur) {
      return Toast(fiel, "error", 5000);
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
    } else {
      dispatch(deleteProduct(id));
    }

    router.push({
      pathname: `/product/[product]`,
      query: {
        product: a?.uid,
      },
    });
  };

  // cerrar
  const onClose = () => {
    router.push({
      pathname: `/product/[product]`,
      query: {
        product: a?.uid,
      },
    });
  };

  return (
    <>
      <VStack spacing={5} w={"full"} border={bordes} p={3}>
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {word}
          </Heading>
        </HStack>
        {word === "edit" ? (
          <ProductForm
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
            handleNumberInput={handleNumberInput}
            handleSubmit={handleSubmit}
            setUrlImage={setUrlImage}
          />
        ) : (
          <ProductFormWord
            handleSubmit={handleSubmit}
            HStack={HStack}
            word={word}
            onClose={onClose}
          />
        )}
      </VStack>
    </>
  );
};

export default ProductData;
