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
  chakra,
  Center,
  VStack,
} from "@chakra-ui/react";

import useFormShow from "../../hooks/useFormShow";
import useForm from "../../hooks/useForm";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";
import NavLink from "../../helpers/Navlink";
import Toast from "../../helpers/Toast";

import { startRegisterWithNameEmailPassword } from "../../actions/auth";

import DividerWithText from "../utils/DividerWithText";

const initialStates = {
  name: "jackson Quintero",
  email: "jackson@gmail.com",
  password: "123456",
  rePassword: "123456",
};

const CreateUser = () => {
  // selector
  const { loading } = useSelector(({ ui }) => ui);
  // dispatch
  const dispatch = useDispatch();
  // vista de la contraseña
  const { show, handleClick, handleClick2 } = useFormShow();
  // guardar states
  const [values, handleInputChange] = useForm(initialStates);
  // validar
  const {
    nameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    field,
    ErrorLorR,
    fiel,
  } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // valores
  const { name, email, password, rePassword } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorLorR) {
      return Toast(fiel, "error", 5000);
    } else {
      dispatch(startRegisterWithNameEmailPassword(email, password, name));
    }
  };

  return (
    <>
      <chakra.form onSubmit={handleSubmit} boxShadow="2xl" p={5}>
        <VStack spacing={5}>
          <Heading w={"full"} as="h1" size={"md"} textTransform={"uppercase"}>
            Crear cuenta
          </Heading>
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
                <Button variant={"secondary"} h="1.75rem" onClick={handleClick}>
                  {show.password ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
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
                  variant={"secondary"}
                  h="1.75rem"
                  onClick={handleClick2}
                >
                  {show.rePassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            isLoading={loading}
            w={"full"}
            type="submit"
            variant={"primary"}
            textTransform={"uppercase"}
          >
            Registrar
          </Button>
          <DividerWithText>OR</DividerWithText>
          <Center>
            <NavLink href={"/account"} variant={"secondary"} name={"Login"} />
          </Center>
        </VStack>
      </chakra.form>
    </>
  );
};

export default CreateUser;
