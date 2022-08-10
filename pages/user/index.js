import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

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

import { Breakpoints } from "../../helpers/Breakpoints";
import { Toast } from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import { useFormAll } from "../../hooks/useFormAll";

import { changeNameImgTel } from "../../actions/auth";

import { FileAll } from "../../utils/FileAll";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const initialStates = {
  uid: "",
  photoURL: "",
  displayName: "",
};

const User = () => {
  // useRouter
  const { locale, push } = useRouter();
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { content5, porcent3, porcent4, bordes } = Breakpoints();
  // useState
  const [urlImage, setUrlImage] = useState("");
  // useState
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!a.uid) push("/");
  });

  const { values, handleInputChange } = useFormAll(initialStates, a);

  // agrega imagen
  values.photoURL = urlImage ? urlImage : values.photoURL;
  // values
  const { uid, photoURL, displayName, emailVerified } = values;
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
    <ShopLayout title={locale === "en-US" ? en.user.uA : es.user.uA}>
      <Container
        maxW={"container.lg"}
        px={{ base: 2, md: 4 }}
        py={{ base: 0, md: 20 }}
      >
        <VStack mb={{ base: 5, md: 10 }}>
          <Heading textTransform={"capitalize"} size={"lg"} textAlign="center">
            {locale === "en-US" ? en.user.uA : es.user.uA}
          </Heading>
          <Heading
            size={"sm"}
            textTransform={"capitalize"}
            fontWeight={"normal"}
          >
            {locale === "en-US" ? en.user.uB : es.user.uB}
          </Heading>
        </VStack>
        <Stack
          flexDirection={content5}
          justifyContent={"space-around"}
          alignItems={"center"}
          spacing={0}
        >
          <VStack spacing={12} h={"full"} mb={{ base: 5, md: 0 }} w={porcent4}>
            <Box p={{ base: 0, md: 5 }}>
              {displayName !== undefined || photoURL !== undefined ? (
                <Avatar size="2xl" name={displayName} src={photoURL} />
              ) : (
                <Avatar size="2xl" />
              )}
            </Box>
            <VStack>
              <Heading size={"md"}>
                {locale === "en-US" ? en.user.uC : es.user.uC}
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
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export default User;
