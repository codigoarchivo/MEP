import React from "react";

import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

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
import { GoogleIcon } from "../../helpers/IconNew";

import { startGoogleLogin } from "../../actions/auth";

const initialStates = {
  email: "",
  password: "",
};

const LoginUser = () => {
  // dispatch
  const dispatch = useDispatch();
  // vista de la contraseña
  const { show, handleClick } = useFormShow();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const { emailE, passwordL, field, fiel, ErrorLorR } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // Breakpoints
  const { points2, repeat1, points3, porcent1 } = Breakpoints();
  // valores
  const { email, password } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorLorR) {
      return Swal.fire("Error", fiel, "error");
    } else {
      console.log("listo");
    }
  };

  const handleGooglelogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <VStack py={points2} justifyContent="center" w={porcent1} boxShadow="2xl">
        <Grid
          onSubmit={handleSubmit}
          as={"form"}
          templateRows={`repeat(4, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
          rowGap={2}
          p={5}
          w={"full"}
        >
          <GridItem colSpan={2}>
            <Heading as="h1" size={"md"} textTransform={"uppercase"}>
              Login
            </Heading>
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
          <GridItem colSpan={2}>
            <FormControl isInvalid>
              <FormLabel htmlFor="password">
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
                  onChange={handleInputChange}
                  value={password}
                  pr="4.5rem"
                  type={show.password ? "text" : "password"}
                  placeholder="Agregar password"
                  autoComplete="new-password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant={"secondary"}
                    h="1.75rem"
                    onClick={handleClick}
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
              w={"100%"}
              variant="outline"
              textTransform={"uppercase"}
              rightIcon={<GoogleIcon />}
              onClick={handleGooglelogin}
            >
              Hacer registro mediante google
            </Button>
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

export default LoginUser;
