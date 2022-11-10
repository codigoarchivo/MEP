import { useState } from "react";

import { Heading, Input, VStack, chakra, Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { useFormAll } from "../../hooks/useFormAll";

import { FileAll } from "../../utils/FileAll";

import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const initialStates = {
  uid: "",
  photoURL: "",
  displayName: "",
};

export const EditUserPublic = () => {
  // useRouter
  const { locale } = useRouter();
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { porcent3, bordes, fondo } = Breakpoints();
  // useState
  const [urlImage, setUrlImage] = useState("");
  // useState
  const [progress, setProgress] = useState(0);

  const { values, handleInputChange } = useFormAll(initialStates, a);

  // agrega imagen
  values.photoURL = urlImage ? urlImage : values.photoURL;
  // values
  const { uid, photoURL, displayName } = values;

  const err = locale === "en-US" ? en.error : es.error;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = locale === "en-US" ? en.verify.vJ : es.verify.vJ;

    dispatch(
      changeNameImgTel(
        uid,
        photoURL,
        displayName,
        a?.email,
        a?.rol,
        a?.emailVerified,
        err,
        data
      )
    );
    Toast(locale === "en-US" ? en.updated : es.updated, "success", 5000);
    setProgress(0);
  };

  return (
    <chakra.form
      backgroundColor={fondo}
      rounded={"lg"}
      boxShadow={"dark-lg"}
      w={porcent3}
      p={{ base: 2, sm: 5 }}
      border={bordes}
      onSubmit={handleSubmit}
    >
      <VStack spacing={10}>
        <Heading
          textTransform={"capitalize"}
          size={"xs"}
          w={"full"}
          fontWeight={"normal"}
        >
          {locale === "en-US" ? en.user.uB : es.user.uB}
        </Heading>
        <FileAll
          progress={progress}
          setProgress={setProgress}
          setUrlImage={setUrlImage}
          fileName={"fotosPerfil"}
          save={locale === "en-US" ? en.goup : es.goup}
          image={locale === "en-US" ? en.image : es.image}
        />

        <Input
          _placeholder={{ color: "inherit" }}
          onChange={handleInputChange}
          value={displayName}
          name={"displayName"}
          placeholder={locale === "en-US" ? en.user.uC : es.user.uC}
        />
        <Button variant={"primary"} type="submit" ml={3}>
          {locale === "en-US" ? en.save : es.save}
        </Button>
      </VStack>
    </chakra.form>
  );
};
