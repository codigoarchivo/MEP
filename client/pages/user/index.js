import React, { useRef } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  AspectRatio,
  Avatar,
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
  Select,
  VStack,
} from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";
import ModeColor from "../../helpers/ModeColor";
import Code from "../../helpers/Code";

import Layout from "../../components/layout/layout";

import useAuth from "../../hooks/useAuth";

import useFormUser from "../../hooks/useFormUser";

import { changeNameImgTel } from "../../actions/auth";

const initialStates = {
  uid: "",
  photoURL: "",
  displayName: "",
  phoneNumber: "",
};

const User = () => {
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
  // code
  const { code } = Code();
  // file
  const file = useRef();
  // useForm

  const [
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
  ] = useFormUser(initialStates, activeSelect);
  // agrega imagen
  values.photoURL = urlImage ? urlImage : values.photoURL;
  // values
  const { uid, photoURL, displayName, phoneNumber } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeNameImgTel(uid, photoURL, displayName, phoneNumber));
  };

  return (
    <Layout>
      {isloggedIn === true && activeSelect?.rol === "owner" ? (
        <Container maxW={"container.xl"} my={10}>
          <VStack>
            <Heading size={"lg"} textAlign="center">
              Perfil público
            </Heading>
            <Heading size={"sm"} fontWeight={"normal"}>
              Información Basica
            </Heading>
          </VStack>
          <Divider
            orientation="horizontal"
            mt={10}
            variant={"dashed"}
            bg={bg2}
          />
          <HStack
            boxShadow="2xl"
            justifyContent={"space-around"}
            p={20}
            spacing={10}
          >
            <VStack spacing={12} h={"full"}>
              <Box>
                {!photoURL ? (
                  <Avatar size="2xl" name={displayName} />
                ) : (
                  <AspectRatio ratio={16 / 9} w={70} h={70}>
                    <Image
                      src={photoURL}
                      alt="Perfil"
                      borderRadius="full"
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
            <chakra.form w={"60%"} onSubmit={handleSubmit}>
              <VStack spacing={10}>
                <Heading size={"xs"} w={"full"} fontWeight={"normal"}>
                  Información Basica
                </Heading>
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
                    Foto de Perfil : {progress}%
                  </Button>
                  <chakra.input
                    onChange={handleInputChange2}
                    name="photoURL"
                    type={"file"}
                    ref={file}
                    display="none"
                  />
                </InputGroup>

                <Input
                  onChange={handleInputChange}
                  value={displayName}
                  name={"displayName"}
                  placeholder="Escribe tu nombre"
                />

                <HStack w={"full"}>
                  <InputGroup>
                    <Select
                      name="phoneNumber"
                      variant="filled"
                      value={phoneNumber}
                      onChange={handleInputChange}
                      placeholder={"País"}
                      w={"30%"}
                    >
                      {code.map(({ code, name }) => (
                        <option key={name} value={code}>
                          {name}: {code}
                        </option>
                      ))}
                    </Select>
                    <Input
                      onChange={handleInputChange}
                      value={phoneNumber}
                      name={"phoneNumber"}
                      type="tel"
                      placeholder="phone number"
                    />
                  </InputGroup>
                </HStack>

                <Button variant={"primary"} type="submit" ml={3}>
                  Guardar
                </Button>
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

export default User;
