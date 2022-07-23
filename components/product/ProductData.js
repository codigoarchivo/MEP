import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import {
  Button,
  CloseButton,
  Heading,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";
import { Toast } from "../../helpers/Toast";
import { Validator } from "../../helpers/Validator";

import { ProductForm } from "./ProductForm";
import { ProductFormWord } from "./ProductFormWord";
import { ProductFormDetails } from "./ProductFormDetails";

import { addProduct, deleteProduct, editProduct } from "../../actions/product";

import { useFormAll } from "../../hooks/useFormAll";

import { enActive, esActive } from "../../actions/ui";

const initialStates = {
  pr: 0,
  cn: 0,
  pj: 0,
  ps: {
    en: "",
    es: "",
  },
  na: {
    en: "",
    es: "",
  },
  ds: {
    en: "",
    es: "",
  },
  dt: {
    en: "",
    es: "",
  },
  ct: "",
  im: "",
};

export const ProductData = ({
  product = {},
  word = "",
  push,
  back,
  locale,
  es,
  en,
}) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { change } = useSelector(({ ui }) => ui);
  // useState
  const [porcent, setporcent] = useState({ pr: "" });
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes } = Breakpoints();
  // useState
  const [urlImage, setUrlImage] = useState("");

  useEffect(() => {
    const dataPorcent = async () => {
      if (a?.rol !== "owner" && word !== "delete" && word !== "details") {
        const docRef = doc(db, "cifras", a.uid);

        const docSnap = await getDoc(docRef);

        setporcent({ ...docSnap.data() });
      }
    };
    dataPorcent();
  }, [setporcent, a?.rol, a.uid, word]);

  // useForm
  const {
    values,
    reset,
    handleInputChange,
    handleInputChangeEnEs,
    handleNumberInputCn,
    handleNumberInputPj,
    handleNumberInputPr,
  } = useFormAll(initialStates, word !== "add" ? product : {});

  // agrega imagen
  values.im = urlImage ? urlImage : values.im;
  values.pj = Number(porcent.pr) ? Number(porcent.pr) : Number(values.pj);
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
            uid: a.uid,
            cre: Date.now(),
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
            uid: a.uid,
            cre: Date.now(),
          },
          err
        )
      );
    }
    reset();
    setUrlImage("");
    setporcent({ pr: "" });
    Toast(locale === "en" ? en.save : es.save, "success", 5000);
    back();
  };

  // cerrar
  const onClose = () => {
    back();
  };

  let info = "";
  switch (word) {
    case "add":
      info = change === false ? en.add : es.add;
      break;
    case "edit":
      info = change === false ? en.edit : es.edit;
      break;
    case "delete":
      info = change === false ? en.delete : es.delete;
      break;
    case "details":
      info = change === false ? en.details : es.details;
      break;
  }

  const enRes = () => {
    dispatch(enActive());
  };
  const esRes = () => {
    dispatch(esActive());
  };

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
        <Stack
          flexDirection={"row"}
          w={"full"}
          justifyContent={"space-between"}
        >
          <HStack>
            <CloseButton display={"inline"} size="md" onClick={onClose} />
            <Heading
              display={"inline"}
              as="h1"
              size={"md"}
              textTransform={"uppercase"}
            >
              {info}
            </Heading>
          </HStack>

          <HStack>
            <Button
              color={change === false ? "brand.700" : "brand.900"}
              variant={"secondary"}
              onClick={enRes}
            >
              en
            </Button>
            <Button
              color={change === true ? "brand.700" : "brand.900"}
              variant={"secondary"}
              onClick={esRes}
            >
              es
            </Button>
          </HStack>
        </Stack>

        {(word === "add" || word === "edit") && (
          <ProductForm
            im={im}
            pj={pj}
            cn={cn}
            pr={pr}
            ct={ct}
            na={change === false ? na.en : na.es}
            ps={change === false ? ps.en : ps.es}
            ds={change === false ? ds.en : ds.es}
            dt={change === false ? dt.en : dt.es}
            change={change}
            naEn={na.en}
            naEs={na.es}
            word={info}
            onClose={onClose}
            handleInputChange={handleInputChange}
            handleInputChangeEnEs={handleInputChangeEnEs}
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
            change={change}
            es={es}
            en={en}
          />
        )}

        {word === "details" && <ProductFormDetails dt={dt} change={change} />}
      </VStack>
    </>
  );
};

ProductData.propTypes = {
  product: PropTypes.object,
  word: PropTypes.string,
  push: PropTypes.func,
  back: PropTypes.func,
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
