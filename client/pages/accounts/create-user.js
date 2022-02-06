import React from "react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import {
  Container,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Heading,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";

import useFormShow from "../../hooks/useFormShow";
import useForm from "../../hooks/useForm";
import Validator from "../../helpers/Validator";

const initialStates = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  rePassword: "",
};

const createUser = () => {
  // vista de la contraseña
  const { show, handleClick, handleClick2 } = useFormShow();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const {
    nameE,
    lastNameE,
    emailE,
    passwordE,
    rePasswordE,
    samePasswordE,
  } = Validator(values);
  // valores
  const { name, lastName, email, password, rePassword } = values;

  return (
    <>
      <Container
        maxW="container.sm"
        centerContent
        h={["auto", "auto", "100vh"]}
        alignItems={["top", "center"]}
        py={"10"}
        justifyContent="center"
      >
        <Heading as="h1" size={"lg"} mb={"10"} textAlign="center">
          Crear una cuenta
        </Heading>
        <Box as={"form"} p={5} rounded={10} w={["100%", "65%", "60%"]}>
          <Stack spacing={0}>
            <FormControl isInvalid>
              {nameE && <FormErrorMessage>{nameE}</FormErrorMessage>}
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Input
                name="name"
                id="name"
                onChange={handleInputChange}
                value={name}
                type={"text"}
                placeholder="Agrega un nombre"
              />
            </FormControl>
            <FormControl isInvalid>
              {lastNameE && <FormErrorMessage>{lastNameE}</FormErrorMessage>}
              <FormLabel htmlFor="lastName">Apellido</FormLabel>
              <Input
                name="lastName"
                id="lastName"
                onChange={handleInputChange}
                value={lastName}
                type={"text"}
                placeholder="Agrega un Apellido"
              />
            </FormControl>
            <FormControl isInvalid>
              {!emailE ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>{emailE}</FormErrorMessage>
              )}
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                id="email"
                onChange={handleInputChange}
                value={email}
                type={"email"}
                placeholder="Agrega un correo"
                autoComplete="new-email"
              />
            </FormControl>
            <FormControl isInvalid>
              {passwordE ? (
                <FormErrorMessage>{passwordE}</FormErrorMessage>
              ) : (
                <FormErrorMessage>{samePasswordE}</FormErrorMessage>
              )}

              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                  value={password}
                  pr="4.5rem"
                  type={show.password ? "text" : "password"}
                  placeholder="Agregar password"
                  autoComplete="new-password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    style={{ boxShadow: "none", background: "none" }}
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show.password ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isInvalid>
              {rePasswordE ? (
                <FormErrorMessage>{rePasswordE}</FormErrorMessage>
              ) : (
                <FormErrorMessage>{samePasswordE}</FormErrorMessage>
              )}
              <FormLabel htmlFor="rePassword">Repetir Contraseña</FormLabel>
              <InputGroup size="md">
                <Input
                  name="rePassword"
                  id="rePassword"
                  onChange={handleInputChange}
                  value={rePassword}
                  pr="4.5rem"
                  type={show.rePassword ? "text" : "password"}
                  placeholder="Repetir password"
                  autoComplete="new-rePassword"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    style={{ boxShadow: "none", background: "none" }}
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick2}
                  >
                    {show.rePassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
          <Button mt={10} colorScheme="teal" type="submit">
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default createUser;
