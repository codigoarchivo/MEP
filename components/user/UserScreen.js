import React, { useEffect } from "react";

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

import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase/config";

import { Toast } from "../../helpers/Toast";

import { useFormAll } from "../../hooks/useFormAll";

import { ModeColor } from "../../helpers/ModeColor";

import { Breakpoints } from "../../helpers/Breakpoints";

import { useSelector } from "react-redux";

import { GridItemForm } from "../../utils/GridItemForm";
import { GridItemFormTextarea } from "../../utils/GridItemFormTextarea";

const initialStates = {
  na: "",
  te: "",
  co: "",
  dt: "",
};

export const UserScreen = ({ user = {}, locale, back, es, en, push }) => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // Breakpoints
  const { repeat1, points3, bordes } = Breakpoints();
  // mode Color
  const { modelE } = ModeColor();

  useEffect(() => {
    if (a.uid === undefined) {
      push("/");
    }
  });

  // useForm
  const { values, handleInputChange } = useFormAll(initialStates, user);
  // values
  const { na, te, co, dt, id } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([na, te, co, dt].includes("")) {
      return Toast(locale === "en-US" ? en.user.uD : es.user.uD, "error", 5000);
    }

    if (a.uid !== id) {
      return Toast(locale === "en-US" ? en.user.uE : es.user.uE, "error", 5000);
    }

    Toast(locale === "en-US" ? en.save : es.save, "success", 5000);
    await setDoc(doc(db, "users", id), { na, te, co, dt, rol: "user" });
    back();
  };

  // cerrar
  const onCloseSelling = () => {
    back();
  };

  return (
    <VStack
      alignContent={"center"}
      h={"full"}
      border={bordes}
      spacing={0}
      my={10}
      p={2}
    >
      <HStack w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        <Heading
          ml={{ base: 2, md: 5 }}
          size={"xs"}
          textTransform={"uppercase"}
          fontWeight={"normal"}
        >
          {locale === "en-US" ? en.user.uF : es.user.uF}
        </Heading>
        <CloseButton color={modelE} onClick={onCloseSelling} />
      </HStack>
      <chakra.form
        onSubmit={handleSubmit}
        w={"full"}
        p={{ base: 0, sm: 5 }}
        overflow={"auto"}
      >
        <Grid
          templateRows={{
            base: `none`,
            md: `repeat(${a.uid !== id ? 4 : 5}, 1fr)`,
          }}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
        >
          {[
            {
              nombre: locale === "en-US" ? en.name : es.name,
              Valor: na,
              na: "na",
              place: locale === "en-US" ? en.name : es.name,
              type: "text",
            },
            {
              nombre: locale === "en-US" ? en.mail : es.mail,
              Valor: co,
              na: "co",
              place: locale === "en-US" ? en.mail : es.mail,
              type: "email",
            },
            {
              nombre: locale === "en-US" ? en.phone : es.phone,
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
            name={locale === "en-US" ? en.additional : es.additional}
            na={"dt"}
            val={dt}
            place={locale === "en-US" ? en.additional : es.additional}
            handle={handleInputChange}
            size={"md"}
          />
          {a.uid === id && (
            <GridItem colSpan={2} mt={5}>
              <HStack w={"full"} justifyContent="flex-end" spacing={10}>
                <>
                  <Button variant={"tertiary"} onClick={onCloseSelling}>
                    {locale === "en-US" ? en.close : es.close}
                  </Button>
                  <Button variant={"primary"} type="submit" ml={3}>
                    {locale === "en-US" ? en.save : es.save}
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
  locale: PropTypes.string,
  back: PropTypes.func,
  es: PropTypes.object,
  en: PropTypes.object,
};
