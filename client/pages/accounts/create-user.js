import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const createUser = () => {
  return (
    <>
      <Container
        maxW="container.sm"
        centerContent
        h={["auto", "auto", "100vh"]}
        alignItems={["top", "center"]}
        py={"50"}
        justifyContent="center"
        px={0}
      >
        <Heading as="h1" size={"lg"} mb={"10"} textAlign="center">
          Crear una cuenta
        </Heading>
        <FormControl
          isRequired
          w={"100"}
          p={"10"}
          boxShadow={"2xl"}
          rounded="md"
          backgroundColor={"brand.600"}
        >
          <Box as={"div"} mb={"5"}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input name="name" type={"text"} placeholder="Agrega un nombre" />
          </Box>
          <Box as={"div"} mb={"5"}>
            <FormLabel htmlFor="lastName">Apellido</FormLabel>
            <Input
              name="lastName"
              type={"text"}
              placeholder="Agrega un Apellido"
            />
          </Box>
          <Box as={"div"} mb={"5"}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input name="email" type={"email"} placeholder="Agrega un correo" />
            <FormHelperText>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          </Box>
          <Box as={"div"} mb={"5"}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              name="password"
              type={"password"}
              placeholder="Agrega un contraseña"
            />
          </Box>
          <Box as={"div"}>
            <FormLabel htmlFor="password2">Repetir Contraseña</FormLabel>
            <Input
              name="password2"
              type={"password"}
              placeholder="Repita la contraseña"
            />
          </Box>
        </FormControl>
      </Container>
    </>
  );
};

export default createUser;
