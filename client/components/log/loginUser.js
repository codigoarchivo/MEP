import React from "react";

import { useDispatch, useSelector } from "react-redux";

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
  GridItem,
  Grid,
  Tooltip,
  Text,
  Flex,
  chakra,
  useToast,
} from "@chakra-ui/react";

import useFormShow from "../../hooks/useFormShow";
import useForm from "../../hooks/useForm";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";
import Breakpoints from "../../helpers/Breakpoints";
import { GoogleIcon } from "../../helpers/IconNew";

import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

import NavLink from "../../helpers/Navlink";
import DividerWithText from "../utils/DividerWithText";

const initialStates = {
  email: "jackson@gmail.com",
  password: "123456",
};

const LoginUser = ({ handleReview }) => {
  // toast
  const toast = useToast();
  // selector
  const { loading } = useSelector(({ ui }) => ui);
  // dispatch
  const dispatch = useDispatch();
  // vista de la contraseña
  const { show, handleClick } = useFormShow();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const { emailE, passwordL, field, fiel, ErrorRorL } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // Breakpoints
  const { repeat1, points3 } = Breakpoints();
  // valores
  const { email, password } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRorL) {
      return toast({
        description: fiel,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(startLoginEmailPassword(email, password));
    }
  };
  // handleGooglelogin
  const handleGooglelogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <chakra.form onSubmit={handleSubmit} boxShadow="2xl">
        <Grid
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
              isLoading={loading}
              mt={10}
              w={"100%"}
              type="submit"
              variant={"primary"}
              textTransform={"uppercase"}
            >
              Registrar
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Flex
              py={2}
              w={"full"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text>¿No tienes una cuenta?</Text>
              <NavLink
                href={"/account/create"}
                variant={"secondary"}
                name={"Regístrate"}
              />
            </Flex>
            <DividerWithText my={3}>OR</DividerWithText>
            <Flex
              py={2}
              w={"full"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text>¿Forgot password?</Text>
              <Button variant={"secondary"} onClick={handleReview}>
                Ingresa
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </chakra.form>
    </>
  );
};

export default LoginUser;
