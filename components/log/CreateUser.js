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

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";
import NavLink from "../../utils/Navlink";
import Toast from "../../helpers/Toast";

import { startRegisterWithNameEmailPassword } from "../../actions/auth";

import DividerWithText from "../../utils/DividerWithText";
import useFormAll from "../../hooks/useFormAll";

const initialStates = {
  name: "jackson Quintero",
  email: "jackson@gmail.com",
  password: "123456",
  rePassword: "123456",
};
const data = {
  pass: false,
  rPass: false,
};
const CreateUser = () => {
  // selector
  const { loading } = useSelector(({ ui }) => ui);
  // dispatch
  const dispatch = useDispatch();
  // useFormAll
  const {
    values,
    handleInputChange,
    handlePassword,
    handleRePassword,
  } = useFormAll(initialStates, data);
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
  const { name, email, password, rePassword, pass, rPass } = values;

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
                type={rPass ? "text" : "password"}
                placeholder="Repetir password"
                autoComplete="new-rePassword"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant={"secondary"}
                  h="1.75rem"
                  onClick={handleRePassword}
                >
                  {rPass ? <ViewIcon /> : <ViewOffIcon />}
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
