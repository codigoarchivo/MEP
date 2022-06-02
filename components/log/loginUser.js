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
  Tooltip,
  Text,
  Flex,
  chakra,
  VStack,
} from "@chakra-ui/react";

import useFormAll from "../../hooks/useFormAll";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";
import { GoogleIcon } from "../../helpers/IconNew";
import Toast from "../../helpers/Toast";
import NavLink from "../../utils/Navlink";

import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

import DividerWithText from "../../utils/DividerWithText";

const initialStates = {
  email: "jackson@gmail.com",
  password: "123456",
};
const data = {
  pass: false,
};
const LoginUser = ({ handleReview }) => {
  // selector
  const { loading } = useSelector(({ ui }) => ui);
  // dispatch
  const dispatch = useDispatch();
  // useFormAll
  const { values, handleInputChange, handlePassword } = useFormAll(
    initialStates,
    data
  );
  // validar
  const { emailE, passwordL, field, fiel, ErrorRorL } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // valores
  const { email, password, pass } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRorL) {
      return Toast(fiel, "error", 5000);
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
      <chakra.form onSubmit={handleSubmit} boxShadow="2xl" p={5}>
        <VStack spacing={5}>
          <Heading w={"full"} size={"md"} textTransform={"uppercase"}>
            Login
          </Heading>
          <FormControl isInvalid>
            {!emailE && (
              <FormHelperText>
                {" Enter the email you'd like to receive the newsletter on."}
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
                type={pass ? "text" : "password"}
                placeholder="Agregar password"
                autoComplete="new-password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant={"secondary"}
                  h="1.75rem"
                  onClick={handlePassword}
                >
                  {pass ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            w={"full"}
            variant="outline"
            textTransform={"uppercase"}
            rightIcon={<GoogleIcon />}
            onClick={handleGooglelogin}
          >
            Hacer registro mediante google
          </Button>
          <Button
            isLoading={loading}
            w={"full"}
            type="submit"
            variant={"primary"}
            textTransform={"uppercase"}
          >
            Registrar
          </Button>
          <Flex w={"full"} alignItems={"center"} justifyContent={"center"}>
            <Text>¿No tienes una cuenta?</Text>
            <NavLink
              href={"/account/create"}
              variant={"secondary"}
              name={"Regístrate"}
            />
          </Flex>
          <DividerWithText>OR</DividerWithText>
          <Flex w={"full"} alignItems={"center"} justifyContent={"center"}>
            <Text>¿Forgot password?</Text>
            <Button variant={"secondary"} onClick={handleReview}>
              Ingresa
            </Button>
          </Flex>
        </VStack>
      </chakra.form>
    </>
  );
};

export default LoginUser;
