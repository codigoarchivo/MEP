import React, { useState } from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { CloseButton, Heading, HStack, VStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";
import Validator from "../../helpers/Validator";

import ProductForm from "./ProductForm";

import ProductFormWord from "./ProductFormWord";

import { addProduct, deleteProduct, editProduct } from "../../actions/product";
import useFormAll from "../../hooks/useFormAll";

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
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { points1, repeat1, points3, bordes } = Breakpoints();

  const [urlImage, setUrlImage] = useState("");

  const data = router.query;
  // useForm
  const { values, handleInputChange, handleNumberInput } = useFormAll(
    initialStates,
    data
  );
  // agrega imagen
  values.im = urlImage ? urlImage : values.im;
  // validar
  const { fiel, estado, ErrorRetur, ErrorRetur2 } = Validator(values);
  // values
  const { na, pr, ds, ct, cn, dt, im, es, id, set } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur2) {
      return Toast(estado, "error", 5000);
    }

    if (ErrorRetur) {
      return Toast(fiel, "error", 5000);
    } else {
      set === "Add" &&
        dispatch(addProduct({ na, pr, ds, ct, cn, dt, im, es: true }));
      set === "Edit" &&
        dispatch(editProduct({ na, pr, ds, ct, cn, dt, im, es, id }));
      set === "Delete" && dispatch(deleteProduct(id));
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
            {set}
          </Heading>
        </HStack>
        {set === "details" || set === "delete" ? (
          <ProductFormWord
            handleSubmit={handleSubmit}
            HStack={HStack}
            dt={dt}
            set={set}
            onClose={onClose}
          />
        ) : (
          <ProductForm
            set={set}
            na={na}
            pr={pr}
            ds={ds}
            ct={ct}
            cn={cn}
            dt={dt}
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
        )}
      </VStack>
    </>
  );
};

export default ProductData;
