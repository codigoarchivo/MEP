import React from "react";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { CloseButton, Heading, HStack, VStack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";
import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import UserForm from "./UserForm";

import UserFormWord from "./UserFormWord";

import { addProduct, deleteProduct, editProduct } from "../../actions/product";

const initialStates = {
  na: "",
  pr: "",
  ds: "",
  ct: "",
  cn: "",
  dt: "",
  im: "",
  ti: "",
};

const UserData = ({ word }) => {
  // router
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { points1, repeat1, points3, bordes } = Breakpoints();

  const activeSelect = { pid: word.b, ti: word.w1 ? word.w1 : word.w2 };
  // useForm
  const {
    reset,
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
  } = useForm(initialStates, activeSelect);
  // agrega imagen
  values.im = urlImage ? urlImage : values.im;
  // validar
  const { fiel, estado, ErrorRetur, ErrorRetur2 } = Validator(values);
  // values
  const { na, pr, ds, ct, cn, dt, im, es, id, ti, pid } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur2) {
      return Toast(estado, "error", 5000);
    }

    if (ErrorRetur) {
      return Toast(fiel, "error", 5000);
    } else {
      // pid === "Add" &&
      //   dispatch(addProduct({ na, pr, ds, ct, cn, dt, im, ti, es: true }));
      // pid === "Edit" &&
      //   dispatch(editProduct({ na, pr, ds, ct, cn, dt, im, ti, es, id }));
      // pid === "Delete" && dispatch(deleteProduct(id));
    }

    onClose();
  };
  // cerrar
  const onClose = () => {
    router.push({
      pathname: "/user/sell",
      query: { create: true },
    });
    Toast(word.d, "success", 5000);
    reset();
  };


  return (
    <>
      <VStack spacing={5} w={"full"} border={bordes} p={3}>
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {pid}
          </Heading>
        </HStack>
        {pid === "Details" || pid === "Delete" ? (
          <UserFormWord
            handleSubmit={handleSubmit}
            HStack={HStack}
            dt={dt}
            pid={pid}
            onClose={onClose}
          />
        ) : (
          <UserForm
            pid={pid}
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
            handleSubmit={handleSubmit}
          />
        )}
      </VStack>
    </>
  );
};

export default UserData;
