import React from "react";

import PropTypes from "prop-types";

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
  HStack,
  CloseButton,
} from "@chakra-ui/react";

import { Validator } from "../../helpers/Validator";
import { ModeColor } from "../../helpers/ModeColor";
import { NavLink } from "../../utils/Navlink";
import { Toast } from "../../helpers/Toast";

import { startRegisterWithNameEmailPassword } from "../../actions/auth";

import { DividerWithText } from "../../utils/DividerWithText";
import { useFormAll } from "../../hooks/useFormAll";

import { Breakpoints } from "../../helpers/Breakpoints";

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
export const CreateUser = ({ locale, es, en, back }) => {
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

  const aM = locale === "en-US" ? en.auth.aM : es.auth.aM;
  const aL = locale === "en-US" ? en.auth.aL : es.auth.aL;
  const aK = locale === "en-US" ? en.auth.aK : es.auth.aK;
  const aN = locale === "en-US" ? en.auth.aN : es.auth.aN;
  const aO = locale === "en-US" ? en.auth.aO : es.auth.aO;
  const aP = locale === "en-US" ? en.auth.aP : es.auth.aP;
  const aQ = locale === "en-US" ? en.auth.aQ : es.auth.aQ;

  // validar
  const {
    nameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    field,
    ErrorLorR,
  } = Validator(values, aM, aL, aK, aN, aO, aP, aQ);

  // mode Color
  const { textError, bgTextError, modelE } = ModeColor();

  // valores
  const { name, email, password, rePassword, pass, rPass } = values;

  const err = locale === "en-US" ? en.error : es.error;
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorLorR) {
      return Toast(locale === "en-US" ? en.check : es.check, "error", 5000);
    } else {
      const data = locale === "en-US" ? en.verify.vJ : es.verify.vJ;
      dispatch(
        startRegisterWithNameEmailPassword(email, password, name, err, data)
      );
    }
  };

  const { bordes, fondo } = Breakpoints();

  return (
    <>
      <chakra.form
        onSubmit={handleSubmit}
        boxShadow="2xl"
        p={{ base: 2, sm: 5 }}
        w={{ base: "100%", sm: "70%", md: "60%", lg: "70%" }}
        h={"min-content"}
        border={bordes}
        bg={fondo}
      >
        <VStack spacing={{ base: 3, sm: 5 }}>
          <HStack w={"full"} justifyContent="space-between">
            <Heading size={"md"} textTransform={"uppercase"}>
              {locale === "en-US" ? en.auth.aH : es.auth.aH}
            </Heading>
            <CloseButton size="sm" onClick={() => back()} />
          </HStack>
          <FormControl>
            <FormLabel htmlFor="name">
              {locale === "en-US" ? en.name : es.name}{" "}
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
              _placeholder={{ color: "inherit" }}
              name="name"
              id="name"
              onChange={handleInputChange}
              value={name}
              type={"text"}
              placeholder={locale === "en-US" ? en.name : es.name}
            />
          </FormControl>
          <FormControl>
            {!emailE && (
              <FormHelperText mt={0}>
                {locale === "en-US" ? en.auth.aI : es.auth.aI}
              </FormHelperText>
            )}
            <FormLabel htmlFor="email">
              {locale === "en-US" ? en.mail : es.mail}{" "}
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
              _placeholder={{ color: "inherit" }}
              name="email"
              id="email"
              onChange={handleInputChange}
              value={email}
              type={"email"}
              placeholder={locale === "en-US" ? en.mail : es.mail}
              autoComplete="new-email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">
              {locale === "en-US" ? en.password : es.password}{" "}
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
                placeholder={locale === "en-US" ? en.password : es.password}
                autoComplete="new-password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant={"tertiary"}
                  h="1.75rem"
                  onClick={handlePassword}
                >
                  {pass ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="rePassword">
              {locale === "en-US" ? en.auth.aR : es.auth.aR}{" "}
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
                _placeholder={{ color: "inherit" }}
                name="rePassword"
                id="rePassword"
                onChange={handleInputChange}
                value={rePassword}
                pr="4.5rem"
                type={rPass ? "text" : "password"}
                placeholder={locale === "en-US" ? en.auth.aR : es.auth.aR}
                autoComplete="new-rePassword"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant={"tertiary"}
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
            {locale === "en-US" ? en.auth.aH : es.auth.aH}
          </Button>
          <DividerWithText>
            {locale === "en-US" ? en.auth.aE : es.auth.aE}
          </DividerWithText>
          <Center>
            <NavLink
              href={"/auth"}
              variant={"tertiary"}
              name={locale === "en-US" ? en.auth.aA : es.auth.aA}
            />
          </Center>
        </VStack>
      </chakra.form>
    </>
  );
};

CreateUser.propTypes = {
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
  back: PropTypes.func,
  push: PropTypes.func,
};
