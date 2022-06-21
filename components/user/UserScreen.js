import React from "react";

import {
  Grid,
  chakra,
  Heading,
  VStack,
  HStack,
  GridItem,
  Button,
  CloseButton,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

import Toast from "../../helpers/Toast";

import useFormAll from "../../hooks/useFormAll";

import ModeColor from "../../helpers/ModeColor";

import Breakpoints from "../../helpers/Breakpoints";

import { useRouter } from "next/router";

import { DataUserAdicional } from "../../actions/user";

import { useDispatch, useSelector } from "react-redux";

import GridItemForm from "../../utils/GridItemForm";
import GridItemFormTextarea from "../../utils/GridItemFormTextarea";

const initialStates = {
  na: "",
  te: "",
  co: "",
  dt: "",
};

const UserScreen = ({ user = {} }) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { repeat1, points3, bordes } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();
  // useForm
  const { values, handleInputChange } = useFormAll(initialStates, user);
  // values
  const { na, te, co, dt, id } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([na, te, co, dt].includes("")) {
      return Toast(
        "Si vas a vender tiene llenar todos los campos",
        "error",
        5000
      );
    }

    if (a.uid !== id) {
      return Toast(
        "No puedes editar un usuario que no te pertenezca",
        "error",
        5000
      );
    }

    dispatch(DataUserAdicional({ na, te, co, dt }, id));

    router.back();
  };

  // cerrar
  const onCloseSelling = () => {
    router.back();
  };

  return (
    <VStack
      alignContent={"center"}
      h={"full"}
      border={bordes}
      spacing={0}
      my={10}
    >
      <HStack
        p={5}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading size={"xs"} textTransform={"uppercase"} fontWeight={"normal"}>
          Información Personal
        </Heading>
        <CloseButton onClick={onCloseSelling} />
      </HStack>
      <chakra.form onSubmit={handleSubmit} w={"full"} p={5}>
        <Grid
          templateRows={`repeat(5, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
        >
          {[
            {
              nombre: "Nombre",
              Valor: na,
              na: "na",
              place: "Nombre",
              type: "text",
            },
            {
              nombre: "Correo",
              Valor: co,
              na: "co",
              place: "Correo",
              type: "email",
            },
            {
              nombre: "Telefono",
              Valor: te,
              na: "te",
              place: "000-000-0000",
              type: "tel",
            },
          ].map(({ nombre, Valor, na, place, type }, key) => (
            <GridItemForm
              isReadOnly={a.uid !== id ? true : false}
              key={key}
              points={2}
              name={nombre}
              na={na}
              val={Valor}
              type={type}
              place={place}
              handle={handleInputChange}
            />
          ))}
          <GridItemFormTextarea
            isReadOnly={a.uid !== id ? true : false}
            points={2}
            name={"Información Adicional"}
            na={"dt"}
            val={dt}
            place={"cuenta de transferencia"}
            handle={handleInputChange}
            bg={bg}
            brand={brand}
            size={"lg"}
          />
          {a.uid === id && (
            <GridItem colSpan={2} mt={5}>
              <HStack w={"full"} justifyContent="flex-end" spacing={10}>
                <>
                  <Button variant={"secondary"} onClick={onCloseSelling}>
                    Close
                  </Button>
                  <Button variant={"primary"} type="submit" ml={3}>
                    Guardar
                  </Button>
                </>
              </HStack>
            </GridItem>
          )}
        </Grid>
      </chakra.form>
    </VStack>
  );
};

UserScreen.propTypes = {
  user: PropTypes.object,
};

export default UserScreen;
