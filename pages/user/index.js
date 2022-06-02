import React, { useState } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
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

const initialStates = {
  uid: "",
  photoURL: "",
  displayName: "",
};

const User = () => {
  // selector
  const { activeSelect: data } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { content5, points24, porcent3, porcent4, bordes } = Breakpoints();

  const [urlImage, setUrlImage] = useState("");

  const { values, handleInputChange } = useFormAll(initialStates, data);

  // agrega imagen
  values.photoURL = urlImage ? urlImage : values.photoURL;
  // values
  const { uid, photoURL, displayName } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeNameImgTel(uid, photoURL, displayName, a?.email, a?.rol));
    Toast("Datos actualizados", "success", 5000);
  };

  return (
    <ShopLayout>
      <Container maxW={"container.lg"} mt={10}>
        <VStack>
          <Heading size={"lg"} textAlign="center">
            Perfil público
          </Heading>
          <Heading size={"sm"} fontWeight={"normal"}>
            Información Basica
          </Heading>
        </VStack>
        <Stack
          flexDirection={content5}
          justifyContent={"space-around"}
          p={points24}
          alignItems={"center"}
        >
          <VStack spacing={12} h={"full"} p={5} mx={5} w={porcent4}>
            <Box border={bordes} p={5} rounded={5}>
              {!photoURL ? (
                <Avatar size="2xl" name={displayName} />
              ) : (
                <AspectRatio ratio={16 / 9} w={70} h={70} position={"relative"}>
                  <Image
                    src={photoURL}
                    alt="Perfil"
                    layout="fill"
                    objectFit="contain"
                  />
                </AspectRatio>
              )}
            </Box>
            <VStack>
              <Heading size={"md"}>Perfil Usuario</Heading>
              <Heading size={"sm"} fontWeight={"normal"}>
                {displayName}
              </Heading>
            </VStack>
          </VStack>
          <chakra.form
            w={porcent3}
            p={5}
            mx={5}
            border={bordes}
            onSubmit={handleSubmit}
          >
            <VStack spacing={10}>
              <Heading size={"xs"} w={"full"} fontWeight={"normal"}>
                Información Basica
              </Heading>
              <FileAll setUrlImage={setUrlImage} fileName={"fotosPerfil"} />

              <Input
                onChange={handleInputChange}
                value={displayName}
                name={"displayName"}
                placeholder="Escribe tu nombre"
              />
              <Button variant={"primary"} type="submit" ml={3}>
                Guardar
              </Button>
            </VStack>
          </chakra.form>
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export default User;
