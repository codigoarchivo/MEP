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
  email: "",
  password: "",
};

export const LoginUser = () => {
  // vista de la contraseña
  const { show, handleClick } = useFormShow();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const { emailE, passwordL, field } = Validator(values);
  // valores
  const { email, password } = values;
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
          <GridItem colSpan={2}>
            <FormControl isInvalid>
              <FormLabel color={textPrimary} htmlFor="password">
                Contraseña{" "}
                <Tooltip
                  color={textError}
                  bg={bgTextError}
                  label={passwordL ? passwordL : field}
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
