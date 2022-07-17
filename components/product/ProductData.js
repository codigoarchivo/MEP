import React, { useEffect, useMemo, useRef, useState } from "react";

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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

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

const ProductData = ({
  product = {},
  set = "",
  details = "",
  push,
  back,
  locale,
  es,
  en,
}) => {
  // useState
  const [word, setWord] = useState("");
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useState
  const [porcent, setporcent] = useState({ pr: "" });
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes } = Breakpoints();
  // useState
  const [urlImage, setUrlImage] = useState("");

  useMemo(() => {
    setWord(set);
  }, [setWord, set]);

  useEffect(() => {
    const dataPorcent = async () => {
      if (a?.rol !== "owner" && word !== "delete" && word !== "details") {
        const docRef = doc(db, "cifras", a.uid);

        const docSnap = await getDoc(docRef);

        setporcent({ ...docSnap.data() });
      }
    };
    dataPorcent();
  }, [setporcent]);

  // useForm
  const {
    values,
    reset,
    handleInputChange,
    handleNumberInputCn,
    handleNumberInputPj,
    handleNumberInputPr,
  } = useFormAll(initialStates, word !== "add" ? product : {});

  // agrega imagen
  values.im = urlImage ? urlImage : values.im;
  values.pj = a?.rol !== "owner" ? Number(porcent.pr) : Number(values.pj);
  values.cn = Number(values.cn);
  values.pr = Number(values.pr);
  // validar
  const { ErrorRetur } = Validator(values);

  // values
  const { na, ds, ct, dt, im, id, ps, pj, cn, pr } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!a.uid) {
      return push("/auth");
    }

    if (ErrorRetur && word !== "delete") {
      return Toast(locale === "en" ? en.check : es.check, "error", 5000);
    }

    const err = locale === "en" ? en.error : es.error;

    if (word === "delete") {
      dispatch(deleteProduct(id, err));
    }

    if (word === "add") {
      dispatch(
        addProduct(
          {
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
          },
          err
        )
      );
    }

    if (word === "edit") {
      dispatch(
        editProduct(
          {
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
          },
          err
        )
      );
    }

    reset();
    Toast(locale === "en" ? en.save : es.save, "success", 5000);
    values.im = "";
  };

  // cerrar
  const onClose = () => {
    back();
  };

  let info = "";
  switch (word) {
    case "add":
      info = locale === "en" ? en.add : es.add;
      break;
    case "edit":
      info = locale === "en" ? en.edit : es.edit;
      break;
    case "delete":
      info = locale === "en" ? en.delete : es.delete;
      break;
    case "details":
      info = locale === "en" ? en.details : es.details;
      break;
  }

  return (
    <>
      <VStack
        backgroundColor={"#fff"}
        spacing={5}
        w={"full"}
        border={bordes}
        p={6}
        boxShadow={"xl"}
      >
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {info}
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
            word={info}
            onClose={onClose}
            handleInputChange={handleInputChange}
            handleNumberInputCn={handleNumberInputCn}
            handleNumberInputPj={handleNumberInputPj}
            handleNumberInputPr={handleNumberInputPr}
            handleSubmit={handleSubmit}
            setUrlImage={setUrlImage}
            porcent={porcent.pr}
            locale={locale}
            es={es}
            en={en}
          />
        )}

        {word === "delete" && (
          <ProductFormWord
            handleSubmit={handleSubmit}
            word={info}
            onClose={onClose}
            locale={locale}
            es={es}
            en={en}
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
  details: PropTypes.string,
  push: PropTypes.func,
  back: PropTypes.func,
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};

export default ProductData;
