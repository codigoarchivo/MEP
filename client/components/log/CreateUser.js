import React from "react";

import { QuestionIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  GridItem,
  Grid,
  Tooltip,
} from "@chakra-ui/react";

import useFormShow from "../../hooks/useFormShow";
import useForm from "../../hooks/useForm";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";
import Breakpoints from "../../helpers/Breakpoints";

const initialStates = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  rePassword: "",
};

export const CreateUser = () => {
  // vista de la contraseña
  const { show, handleClick, handleClick2 } = useFormShow();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const {
    nameE,
    lastNameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    field,
  } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // Breakpoints
  const { points1, points2, repeat1, points3 } = Breakpoints();
  // valores
  const { name, lastName, email, password, rePassword } = values;
  return (
    <>
      <VStack py={points2} justifyContent="center">
        <Grid
          as={"form"}
          templateRows={`repeat(5, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
          rowGap={2}
          maxW={"full"}
          p={5}
        >
          <GridItem colSpan={2}>
            <Heading as="h1" size={"md"} textTransform={"uppercase"}>
              Crear cuenta
            </Heading>
          </GridItem>
          <GridItem colSpan={points1}>
            <FormControl isInvalid>
              <FormLabel htmlFor="name">
                Nombre{" "}
                <Tooltip
                  color={textError}
                  bg={bgTextError}
                  label={nameE ? nameE : field}
                  aria-label="A tooltip"
                >
                  <QuestionIcon />
                </Tooltip>
              </FormLabel>

              <Input
                name="name"
                id="name"
                onChange={handleInputChange}
                value={name}
                type={"text"}
                placeholder="Agrega un nombre"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={points1}>
            <FormControl isInvalid>
              <FormLabel htmlFor="lastName">
                Apellido{" "}
                <Tooltip
                  color={textError}
                  bg={bgTextError}
                  label={lastNameE ? lastNameE : field}
                  aria-label="A tooltip"
                >
                  <QuestionIcon />
                </Tooltip>
              </FormLabel>
              <Input
                name="lastName"
                id="lastName"
                onChange={handleInputChange}
                value={lastName}
                type={"text"}
                placeholder="Agrega un Apellido"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid>
              {!emailE && (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              )}
              <FormLabel htmlFor="email">
                Email{" "}
                <Tooltip
                  color={textError}
                  bg={bgTextError}
                  label={emailE ? emailE : field}
                  aria-label="A tooltip"
                >
                  <QuestionIcon />
                </Tooltip>
              </FormLabel>
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
          </GridItem>
          <GridItem colSpan={points1}>
            <FormControl isInvalid>
              <FormLabel htmlFor="password">
                Contraseña{" "}
                <Tooltip
                  color={textError}
                  bg={bgTextError}
                  label={coPasswordE ? coPasswordE : field}
                  aria-label="A tooltip"
                >
                  <QuestionIcon />
                </Tooltip>
              </FormLabel>
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
                    onClick={handleClick}
                  >
                    {show.password ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={points1}>
            <FormControl isInvalid>
              <FormLabel htmlFor="rePassword">
                Repetir Contraseña{" "}
                <Tooltip
                  color={textError}
                  bg={bgTextError}
                  label={coRePasswordE ? coRePasswordE : field}
                  aria-label="A tooltip"
                >
                  <QuestionIcon />
                </Tooltip>
              </FormLabel>
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
                    onClick={handleClick2}
                  >
                    {show.rePassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              mt={10}
              w={"100%"}
              type="submit"
              variant={"primary"}
              textTransform={"uppercase"}
            >
              Registrar
            </Button>
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
};
