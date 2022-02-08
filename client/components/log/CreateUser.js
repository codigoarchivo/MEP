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
  useColorMode,
  GridItem,
  Grid,
  Tooltip,
} from "@chakra-ui/react";

import useFormShow from "../../hooks/useFormShow";
import useForm from "../../hooks/useForm";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";

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
  const { nameE, lastNameE, emailE, coPasswordE, coRePasswordE, field } = Validator(
    values
  );
  // valores
  const { name, lastName, email, password, rePassword } = values;
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();
  // mode Color
  const { bg, textPrimary, textError, bgTextError, bgInput } = ModeColor();

  return (
    <>
      <VStack
        py={[10, 5]}
        px={5}
        w={"full"}
        h={"full"}
        spacing={0}
        justifyContent="center"
      >
        <Grid
          as={"form"}
          templateRows={`repeat(5, 1fr)`}
          templateColumns={`repeat(2, 1fr)`}
          alignItems={["top", "center"]}
          columnGap={5}
          rowGap={2}
        >
          <GridItem colSpan={1}>
            <Heading
              as="h1"
              size={"sm"}
              color={textPrimary}
              textTransform={"uppercase"}
            >
              Crear cuenta
            </Heading>
          </GridItem>

          <GridItem colSpan={1}>
            <Button
              onClick={toggleColorMode}
              bg={bg}
              color={textPrimary}
              textTransform={"uppercase"}
              size={"sm"}
            >
              Modo {colorMode === "light" ? "Oscuro" : "Claro"}
            </Button>
          </GridItem>
          <GridItem colSpan={[2, 2, 1]}>
            <FormControl isInvalid>
              <FormLabel color={textPrimary} htmlFor="name">
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
                bg={bgInput}
                onChange={handleInputChange}
                value={name}
                type={"text"}
                placeholder="Agrega un nombre"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={[2, 2, 1]}>
            <FormControl isInvalid>
              <FormLabel color={textPrimary} htmlFor="lastName">
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
                bg={bgInput}
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
              <FormLabel color={textPrimary} htmlFor="email">
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
                bg={bgInput}
                onChange={handleInputChange}
                value={email}
                type={"email"}
                placeholder="Agrega un correo"
                autoComplete="new-email"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={[2, 2, 1]}>
            <FormControl isInvalid>
              <FormLabel color={textPrimary} htmlFor="password">
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
                  bg={bgInput}
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
                    color={textPrimary}
                  >
                    {show.password ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={[2, 2, 1]}>
            <FormControl isInvalid>
              <FormLabel color={textPrimary} htmlFor="rePassword">
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
                  bg={bgInput}
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
                    color={textPrimary}
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
              bg={bg}
              w={"100%"}
              type="submit"
              color={textPrimary}
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
