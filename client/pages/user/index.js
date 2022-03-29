import React, { useRef } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  AspectRatio,
  Box,
  Button,
  chakra,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import ModeColor from "../../helpers/ModeColor";

import Layout from "../../components/layout/layout";

import useAuth from "../../hooks/useAuth";
import { DownloadIcon } from "@chakra-ui/icons";
import useForm from "../../hooks/useForm";

const initialStates = {
  uid: "",
  photoURL: "",
  displayName: "",
  phoneNumber: "",
};

const CategoryList = () => {
  // router
  const router = useRouter();
  // breakpoints
  const { center, points19, points20 } = Breakpoints();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // useAuth
  const { isloggedIn } = useAuth();
  // dispatch
  const dispatch = useDispatch();
  // mode Color
  const { bg, bg2 } = ModeColor();
  // file
  const file = useRef();

  const { uid, photoURL, displayName, phoneNumber } = activeSelect;
  // useForm
  const [
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange3,
  ] = useForm(initialStates, activeSelect);
 //TODO Modificar user 
  return (
    <Layout>
      {isloggedIn === true && activeSelect?.rol === "owner" ? (
        <Container maxW={"container.lg"} my={20}>
          <VStack w={"full"}>
            <Heading size={"lg"} textAlign="center">
              Perfil público
            </Heading>
            <Heading size={"sm"} fontWeight={"normal"}>
              Información Basica
            </Heading>
          </VStack>
          <Divider
            orientation="horizontal"
            my={10}
            variant={"dashed"}
            bg={bg2}
          />
          <HStack boxShadow="2xl" p={10} spacing={10}>
            <VStack>
              {photoURL && (
                <AspectRatio ratio={16 / 9} w={70} h={70}>
                  <Image
                    src={photoURL}
                    alt="Perfil"
                    layout="fill"
                    objectFit="contain"
                  />
                </AspectRatio>
              )}
              <Heading size={"md"}>Perfil Usuario</Heading>
              <Heading size={"sm"} fontWeight={"normal"}>
                {displayName}
              </Heading>
            </VStack>
            <chakra.form>
              <VStack spacing={5}>
                <Heading size={"xs"} w={"full"} fontWeight={"normal"}>
                  Información Basica
                </Heading>
                <Input placeholder="Escribe tu nombre" />
                <InputGroup>
                  <Button
                    w={"full"}
                    rightIcon={<DownloadIcon w={6} h={6} />}
                    variant={"outline"}
                    textTransform={"uppercase"}
                    onClick={() => file.current.click()}
                    size="md"
                    fontWeight={"normal"}
                    _hover={{ border: bg }}
                    p={1}
                  >
                    Subir: {progress}%
                  </Button>
                  <Box
                    onChange={handleInputChange3}
                    name="im"
                    type={"file"}
                    ref={file}
                    as={"input"}
                    display="none"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="+234" />
                  <Input type="tel" placeholder="phone number" />
                </InputGroup>
              </VStack>
            </chakra.form>
          </HStack>
        </Container>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default CategoryList;
