import React, { useState } from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  Heading,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import useFormAll from "../../hooks/useFormAll";

import { changeNameImgTel } from "../../actions/auth";

import FileAll from "../../utils/FileAll";

import en from "../../translations/en";
import es from "../../translations/es";

const initialStates = {
  uid: "",
  photoURL: "",
  displayName: "",
};

const User = () => {
  // useRouter
  const { locale, push } = useRouter();
  // selector
  const { activeSelect: data } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { content5, porcent3, porcent4, bordes } = Breakpoints();

  const [urlImage, setUrlImage] = useState("");

  if (!data.uid) {
    push("/");
  }

  const { values, handleInputChange } = useFormAll(initialStates, data);

  // agrega imagen
  values.photoURL = urlImage ? urlImage : values.photoURL;
  // values
  const { uid, photoURL, displayName } = values;
  const err = locale === "en" ? en.error : es.error;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeNameImgTel(uid, photoURL, displayName, a?.email, a?.rol, err)
    );
    Toast("Datos actualizados", "success", 5000);
  };

  return (
    <ShopLayout title={locale === "en" ? en.user.uA : es.user.uA}>
      <Container maxW={"container.lg"} py={{ base: 0, md: 20 }}>
        <VStack mb={{ base: 5, md: 10 }}>
          <Heading textTransform={"capitalize"} size={"lg"} textAlign="center">
            {locale === "en" ? en.user.uA : es.user.uA}
          </Heading>
          <Heading
            size={"sm"}
            textTransform={"capitalize"}
            fontWeight={"normal"}
          >
            {locale === "en" ? en.user.uB : es.user.uB}
          </Heading>
        </VStack>
        <Stack
          flexDirection={content5}
          justifyContent={"space-around"}
          alignItems={"center"}
          spacing={0}
        >
          <VStack spacing={12} h={"full"} mb={{ base: 5, md: 0 }} w={porcent4}>
            <Box p={{ base: 0, md: 5 }} rounded={5}>
              <Avatar
                size="2xl"
                name={displayName}
                src={
                  photoURL ||
                  `https://via.placeholder.com/90.png?text=${
                    locale === "en" ? en.picture : es.picture
                  }`
                }
              />
            </Box>
            <VStack>
              <Heading size={"md"}>
                {locale === "en" ? en.user.uC : es.user.uC}
              </Heading>
              <Heading
                textTransform={"capitalize"}
                size={"sm"}
                fontWeight={"normal"}
              >
                {displayName}
              </Heading>
            </VStack>
          </VStack>
          <chakra.form
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
                {locale === "en" ? en.user.uB : es.user.uB}
              </Heading>
              <FileAll
                setUrlImage={setUrlImage}
                fileName={"fotosPerfil"}
                save={locale === "en" ? en.goup : es.goup}
                image={locale === "en" ? en.image : es.image}
              />

              <Input
                onChange={handleInputChange}
                value={displayName}
                name={"displayName"}
                placeholder="Escribe tu nombre"
              />
              <Button variant={"primary"} type="submit" ml={3}>
                {locale === "en" ? en.save : es.save}
              </Button>
            </VStack>
          </chakra.form>
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export default User;
